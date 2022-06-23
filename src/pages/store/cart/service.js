const { default: axiosClient } = require('util/axiosClient');

//Get product by id
export const getProductById = async (params) => {
  const url = `/products/${params}`;
  return axiosClient.get(url, { params });
};

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
