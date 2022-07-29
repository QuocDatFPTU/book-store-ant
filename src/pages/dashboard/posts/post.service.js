import environment from 'environments/environment';
import axiosClient from 'util/axiosClient';
import request from 'util/request';

export const getPostList = async (params) => {
  return request(environment.api.getPost, params, 'GET');
};

export const getCategoryList = async (params) => {
  return request(environment.api.getCategory, params, 'GET');
};

export async function createPost(payload) {
  return request(environment.api.createPost, payload, 'POST');
}

export async function updatePost(payload) {
  return request(environment.api.updatePost, payload, 'PUT');
}
