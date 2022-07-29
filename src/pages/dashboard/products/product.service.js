import axiosClient from 'util/axiosClient';

export const getProductList = async (params) => {
  const url = '/products/test';
  return axiosClient.get(url, { params });
};

export async function updateProduct(payload) {
  const url = `/products/${payload?.id}`;
  const updateValue = {
    ...payload,
  };
  return axiosClient.put(url, updateValue);
}

export async function createProduct(payload) {
  const url = '/products';
  const newProduct = {
    ...payload,
  };
  return axiosClient.post(url, newProduct);
}

export const getCategoryList = async (params) => {
  const url = '/categories';
  return axiosClient.get(url, { params });
};
