import axiosClient from "util/axiosClient";

// get user from session. If not, get from user profile
export const getOrderInformation = async (params) => {
  const url = `/orders/me/${params}`;
  return axiosClient.get(url, { params });
};
