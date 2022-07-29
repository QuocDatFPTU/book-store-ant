import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-

//Config request
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
  paramsSerializer: (params) => queryString.stringify(params),
});

//Request send with auhthorization
axiosClient.interceptors.request.use(async (config) => {
  const access_token = await localStorage.getItem('__token');
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  // Handle token here ...
  // const currentUser = firebase.auth().currentUser;
  // if (currentUser) {
  //   const token = await currentUser.getIdToken();
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
