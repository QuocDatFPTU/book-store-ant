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
