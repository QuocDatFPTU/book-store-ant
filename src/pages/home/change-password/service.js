import axiosClient from "util/axiosClient";

// Update new passord
export const updateNewPassword = async (params) => {
  const url = "/user/new-password";
  return axiosClient.patch(url, { ...params });
};
