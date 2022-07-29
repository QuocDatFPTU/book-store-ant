import { async } from '@firebase/util';
import axiosClient from 'util/axiosClient';

// Get all products
export const getProductListFearture = async (params) => {
  const url = '/products';
  return axiosClient.get(url, { params });
};

// Get all sliders
export const getSliderList = async (params) => {
  const url = '/sliders';
  return axiosClient.get(url, { params });
};

// Get all sliders
export const getBlogList = async (params) => {
  const url = '/blogs';
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
