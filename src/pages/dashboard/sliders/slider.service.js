import axiosClient from 'util/axiosClient';

export const getSliderList = async (params) => {
  const url = '/sliders';
  return axiosClient.get(url, { params });
};
