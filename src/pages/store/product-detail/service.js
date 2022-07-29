import axiosClient from 'util/axiosClient';

//Get all products
export const getProductDetailById = async (params) => {
  // eslint-disable-next-line quotes
  const url = `/products/${params}`;
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

//Get categorise name
export const getCategoyById = async (params) => {
  const url = `/categories/${params}`;
  return axiosClient.get(url);
};

// Get all products
export const getProductListFearture = async (params) => {
  const url = '/products?feartured=true&status=true&limit=5&page=1';
  return axiosClient.get(url, { params });
};

export const getFeedbackProductDetailById = async (params) => {
  // eslint-disable-next-line quotes
  const url = `feedbacks/product/${params}`;
  return axiosClient.get(url);
};