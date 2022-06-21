import axiosClient from 'util/axiosClient';

//Get all products
export const getProductList = async (params) => {
  // eslint-disable-next-line quotes
  console.log(123400);
  const url = '/products';
  return axiosClient.get(url, { params });
};
