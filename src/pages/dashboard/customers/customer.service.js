import axiosClient from 'util/axiosClient';

export const getCustomerList = async (params) => {
  const url = '/customers';
  return axiosClient.get(url, { params });
};

export async function updateCustomer(payload) {
  const { id, ...updatePayload } = payload;
  const url = `/customers/${id}`;
  const updateValue = {
    ...updatePayload,
  };
  return axiosClient.patch(url, updateValue);
}

export async function createCustomer(payload) {
  const url = 'customers';
  const newCustomer = {
    ...payload,
  };
  return axiosClient.post(url, newCustomer);
}

export const getCategoryList = async (params) => {
  const url = '/categories';
  return axiosClient.get(url, { params });
};
