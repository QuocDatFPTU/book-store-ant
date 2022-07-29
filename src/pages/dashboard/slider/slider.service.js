import axiosClient from 'util/axiosClient';

export const getSliderList = async (params) => {
  const url = '/sliders/marketing';
  return axiosClient.get(url, { params });
};

export async function updateSlider(payload) {
  const { id, ...updatePayload } = payload;
  const url = `/sliders/marketing/${id}`;
  const updateValue = {
    ...updatePayload,
  };
  return axiosClient.patch(url, updateValue);
}

export async function createSlider(payload) {
  const url = 'sliders/marketing';
  const newSlider = {
    ...payload,
  };
  return axiosClient.post(url, newSlider);
}

export const getCategoryList = async (params) => {
  const url = '/categories';
  return axiosClient.get(url, { params });
};
