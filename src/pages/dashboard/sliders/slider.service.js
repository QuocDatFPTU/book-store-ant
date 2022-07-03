import axiosClient from 'util/axiosClient';

export const getSliderList = async (params) => {
  const url = '/sliders';
  console.log(params);
  return axiosClient.get(url, { params });
};

export async function createSlider(payload) {
  const url = '/sliders';
  const newSlider = {
    ...payload,
  };
  return axiosClient.post(url, newSlider);
}
