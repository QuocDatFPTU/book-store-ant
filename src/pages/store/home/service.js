import axiosClient from 'util/axiosClient';

// Get all products
export const getProductListFearture = async (params) => {
  const url = '/products?feartured=true&status=true&limit=8&page=1';
  return axiosClient.get(url, { params });
};

//Get all categories
export const getCategoyList = async (params) => {
  const url = '/categories';
  return axiosClient.get(url, { params });
};

//Get categorise name
export const getCategoyById = async (params) => {
  const url = `/categories/${params}`;
  return axiosClient.get(url);
};
