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
