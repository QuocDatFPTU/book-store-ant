import environment from 'environments/environment';
import axiosClient from 'util/axiosClient';
import request from 'util/request';

export const getPostList = async (params) => {
  return request(environment.api.getPost, params, 'GET');
};

// export async function updateProduct(payload) {
//   const url = `/products/${payload?.id}`;
//   const updateValue = {
//     ...payload,
//   };
//   return axiosClient.put(url, updateValue);
// }

// export async function createPost(payload) {
//   const url = '/posts';
//   const newPost = {
//     ...payload,
//   };
//   return axiosClient.post(url, newPost);
// }

export const getCategoryList = async (params) => {
  return request(environment.api.getCategory, params, 'GET');
};

export async function createPost(payload) {
  return request(environment.api.createPost, payload, 'POST');
}

export async function updatePost(payload) {
  return request(environment.api.updatePost, payload, 'PUT');
}