import axiosClient from 'util/axiosClient';

//Get all categories
export const getCategoyList = async (params) => {
  // eslint-disable-next-line quotes
  console.log(123400);
  const url = '/categories';
  return axiosClient.get(url, { params });
};

//Get all products by cart
export const getProductListByCategory = async (params) => {
  // eslint-disable-next-line quotes
  console.log(123400);
  const url = `/products/category/${params}`;
  return axiosClient.get(url);
};
