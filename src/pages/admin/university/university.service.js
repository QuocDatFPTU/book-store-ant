import axiosClient from "../../../util/axiosClient";
import axiosFormCreate from "../../../util/axiosFormCreate";
export async function getListUni (params) {
  const url = "/universities";
  return axiosClient.get(url, { params });
}

export async function getUniById (id) {
  const url = `/universities/${id}`;
  return axiosClient.get(url);
}

export async function updateUni (payload) {
  const uniId = payload.Id;
  const url = `/universities/${uniId}`;
  const formData = new FormData();
  for (const [key, val] of Object.entries(payload)) {
    // append each item to the formData (converted to JSON strings)
    formData.append(key, val);
  }
  return axiosFormCreate.put(url, formData);
}

export async function createUni (payload) {
  const url = "/universities";
  const formData = new FormData();
  for (const [key, val] of Object.entries(payload)) {
    // append each item to the formData (converted to JSON strings)
    formData.append(key, val);
  }
  return axiosFormCreate.post(url, formData);
}
