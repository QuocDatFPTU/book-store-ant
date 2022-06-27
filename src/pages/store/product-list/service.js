import axiosClient from 'util/axiosClient';

//Get all categories
export const getCategoyList = async (params) => {
  const url = '/categories';
  return axiosClient.get(url, { params });
};

//Get all products by cart
export const getProductListByCategory = async (params) => {
  // eslint-disable-next-line quotes
  const url = `/products/category/${params}?status=true&limit=12`;
  return axiosClient.get(url);
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
