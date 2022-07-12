import axiosClient from 'util/axiosClient';

export const getOrderList = async (params) => {
  const url = '/orders/saler';
  return axiosClient.get(url, { params });
};

export async function updateOrder(payload) {
  const { id, ...updatePayload } = payload;
  const url = `/orders/saler/${id}`;
  const updateValue = {
    ...updatePayload,
  };
  return axiosClient.patch(url, updateValue);
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
