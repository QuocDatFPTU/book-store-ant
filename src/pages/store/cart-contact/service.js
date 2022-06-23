const { default: axiosClient } = require('util/axiosClient');

//get user from session. If not, get from user profile
export const getReceiverInfor = async (params) => {
  const url = `/checkout/receive-information`;
  return axiosClient.get(url, { params });
};
