import axios from 'axios';
import environment from 'environments/environment';
import _ from 'lodash'
import queryString from 'query-string';

const getAxiosInstance = (baseUrl) => {
    const access_token = localStorage.getItem('__token');

    const headers = {
        ...(access_token ? { Authorization: 'Bearer' + access_token } : {})
    }

    const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers,
        paramsSerializer: (params) => queryString.stringify(params),
    })

    axiosInstance.interceptors.response.use(
        (response) => {
            if ([200, 201].includes(response.status)) {
                const result = response.data;
                if (_.isObject(result.isObject)) {
                    result.statusCode = response.status;
                }
                return response.data;
            }
            return Promise.reject(response);
        },
        (error) => {
            throw error;
        }
    )

    return axiosInstance;
}

const request = (url, data = {}, method = 'POST') => {
    try {
        const API = getAxiosInstance(environment.baseURL);
        switch (method) {
            case 'GET':
                return API.get(url, { params: data });
            case 'PUT':
                return API.put(url, data);
            case 'DELETE':
                return API.delete(url, data);
            case 'GET-ONE':
                return API.get(url);
            default:
                return API.post(url, data);
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export default request;
