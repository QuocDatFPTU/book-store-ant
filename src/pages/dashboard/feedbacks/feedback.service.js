import axiosClient from 'util/axiosClient';

//saler
export const getFeedbackList = async (params) => {
  const url = '/feedbacks/marketing';
  return axiosClient.get(url, { params });
};

export async function updateFeedback(payload) {
  const { id, ...updateFeedback } = payload;
  const url = `/feedbacks/marketing/${id}`;
  return axiosClient.patch(url, updateFeedback);
}

export async function updateOrder(payload) {
  const { id, ...updatePayload } = payload;
  const url = `/orders/saler/${id}`;
  const updateValue = {
    ...updatePayload,
  };
  return axiosClient.patch(url, updateValue);
}

export const getCategoryList = async (params) => {
  const url = '/categories';
  return axiosClient.get(url, { params });
};

//saleManger
export const getOrderListSaleManager = async (params) => {
  const url = '/orders/saleManager';
  return axiosClient.get(url, { params });
};

export const getSalerListSaleManager = async (params) => {
  const url = '/user/salers';
  return axiosClient.get(url, { params });
};

export async function updateOrderSaleManager(payload) {
  const url = `/orders/saleManager`;
  return axiosClient.patch(url, payload);
}
