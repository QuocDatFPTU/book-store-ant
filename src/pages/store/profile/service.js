import request from "util/request";

const { default: axiosClient } = require("util/axiosClient");

// Get user profile
export const getUserInformation = async (params) => {
  const url = "/user/profile";
  return axiosClient.get(url, { params });
};

export const getUserInformation1= async (params) => {
  const url = "/user/profile";
  return request(url,{}, 'GET')
};
// Update user profile
export const updateUserInformation = async (params) => {
  const url = "/user/profile";
  return axiosClient.patch(url, { ...params });
};
