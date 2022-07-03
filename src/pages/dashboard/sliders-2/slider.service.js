import axiosClient from 'util/axiosClient';

export const getSliderList = async (params) => {
  const url = `/sliders`;
  const queryValue = { params };
  return axiosClient.get(url, queryValue);
};

export const updateSlider = async (payload) => {
  const url = `/sliders`;
  const updateValue = { ...payload };
  return axiosClient.patch(url, updateValue);
};

export const createSlider = async (payload) => {
  const url = `/sliders`;
  const newSlider = { ...payload };
  return axiosClient.patch(url, newSlider);
};
