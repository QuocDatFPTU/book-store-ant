const { default: axiosClient } = require('util/axiosClient');

//------------------------CUSTOMER
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

//--------------------GUEST
//get user from sessio
export const getReceiverInforGuest = async (params) => {
  const url = `/checkout/receive-information/guest`;
  return axiosClient.get(url, { params });
};

//Get all cart items
export const getCartItemListGuest = async (params) => {
  const url = '/cart/guest';
  return axiosClient.get(url, { params });
};

//create order overiew
export const createOrderGuest = async (params) => {
  const url = '/checkout/confirm/guest';
  return axiosClient.post(url, { params });
};

// get user from session. If not, get from user profile
export const getOrderInformation = async (params) => {
  const url = `/orders/me/${params}`;
  return axiosClient.get(url, { params });
};
