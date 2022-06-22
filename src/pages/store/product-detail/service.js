import axiosClient from 'util/axiosClient';

//Get all products
export const getProductDetailById = async (params) => {
  // eslint-disable-next-line quotes
  const url = `/products/${params}`;
  return axiosClient.get(url, { params });
};
