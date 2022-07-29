const { default: axiosClient } = require('util/axiosClient');

//-----------------------------CUSTOMER
//Get all cart items
export const getCartItemList = async (params) => {
  const url = '/cart';
  return axiosClient.get(url, { params });
};

//Update cartItem quantity
export const updateCartItemQuantity = async (params) => {
  const url = '/cart';
  return axiosClient.patch(url, { ...params });
};

//Delete cartItem
export const deleteCartItem = async (params) => {
  const url = `/cart/${params}`;
  return axiosClient.delete(url, { ...params });
};

//Check cartItem valid when checkout
export const onCheckout = async (params) => {
  const url = `/checkout`;
  return axiosClient.post(url, { ...params });
};

//-------------------------GUEST
//Get all cart items
export const getCartItemListGuest = async (params) => {
  const url = '/cart/guest';
  return axiosClient.get(url, { params });
};

//Delete cartItem
export const deleteCartItemGuest = async (params) => {
  console.log(params);
  const url = `/cart/guest/${params}`;
  return axiosClient.delete(url, { ...params });
};

//Update cartItem quantity
export const updateCartItemQuantityGuest = async (params) => {
  const url = '/cart/guest';
  return axiosClient.patch(url, { ...params });
};

//Check cartItem valid when checkout
export const onCheckoutGuest = async (params) => {
  const url = `/checkout/guest`;
  return axiosClient.post(url, { ...params });
};
