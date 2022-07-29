import axiosClient from 'util/axiosClient';

//Get all categories
export const getCategoyList = async (params) => {
  const url = '/categories';
  return axiosClient.get(url, { params });
};

export const getProductListByCategory = async (categoryId, params) => {
  const url = `/products/category/${categoryId}`;
  return axiosClient.get(url, { params });
};

// Add to cart: customer
export const addProudctToCart = async (params) => {
  const url = '/cart';
  return axiosClient.post(url, { ...params });
};

// Add to cart: guest
export const addProudctToCartGuest = async (params) => {
  const url = '/cart/guest';
  return axiosClient.post(url, { ...params });
};
