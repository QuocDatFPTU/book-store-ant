import axiosClient from "util/axiosClient";

// get user from session. If not, get from user profile
export const getOrderList = async (params) => {
  const url = "/orders/me";
  return axiosClient.get(url, { params });
};
