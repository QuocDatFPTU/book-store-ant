import axiosClient from "util/axiosClient";
import request from "util/request";
import queryString from 'query-string';
// get user from session. If not, get from user profile
export const getOrderInformation = async (params) => {
  // const orderId = queryString.stringify(params);
  const url = `/orders/me/${params}`;
  return axiosClient.get(url);
};

export const createFeedback = async (params, payload) => {
  // const orderId = queryString.stringify(params);
  console.log('payload', payload);
  const url = `/feedbacks/product/${params}`;
  return request(url, payload, 'POST');
};

export const getFeedback = async (params) => {
  // const orderId = queryString.stringify(params);
  const url = `/feedbacks/product/${params}`;
  return request(url, {}, 'GET');
};