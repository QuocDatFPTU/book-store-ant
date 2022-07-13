import environment from 'environments/environment';
import request from 'util/request';

export const getUserList = async (params) => {
  return request(environment.api.getUserList, params, 'GET');
};

export const getRoleList = async (params) => {
  return request(environment.api.getRoleList, params, 'GET');
};
export const createUser = async (params) => {
  return request(environment.api.getUserList, params, 'POST');
};

export const updateUser = async (params) => {
  return request(environment.api.getUserList, params, 'PUT');
};
export const deleteUser = async (params) => {
  return request(environment.api.getUserList, params, 'DELETE');
};
