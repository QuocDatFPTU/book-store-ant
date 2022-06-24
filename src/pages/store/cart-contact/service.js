const { default: axiosClient } = require('util/axiosClient');

//get user from session. If not, get from user profile
export const getReceiverInfor = async (params) => {
  const url = `/checkout/receive-information`;
  return axiosClient.get(url, { params });
};

//Set Session receiver information
export const setReceiverInforSession = async (params) => {
  const url = `checkout/receive-inforamation`;
  return axiosClient.post(url, { ...params });
};

//Get all cart items
export const getCartItemList = async (params) => {
  const url = '/cart';
  return axiosClient.get(url, { params });
};

//
export const createOrder = async (params) => {
  const url = '/checkout/confirm';
  return axiosClient.post(url, { params });
};
