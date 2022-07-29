import environment from 'environments/environment';
import axiosClient from 'util/axiosClient';
import request from 'util/request';

export const getUserList = async (params) => {
  return request(environment.api.getUserList, params, 'GET');
};

export const getRoleList = async (params) => {
  return request(environment.api.getRoleList, params, 'GET');
};

export async function createUser(payload) {
  const url = '/user/admin';
  const newUser = {
    ...payload,
  };
  return axiosClient.post(url, newUser);
}

export async function updateUser(payload) {
  const url = `/user/admin`;
  const updateValue = {
    ...payload,
  };
  return axiosClient.put(url, updateValue);
}
