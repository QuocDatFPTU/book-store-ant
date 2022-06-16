import axiosClient from "../../../util/axiosClient";

export const getDepaList = async (params) => {
  const url = "/departments";
  return axiosClient.get(url, { params });
};

export async function updateDepartment (payload) {
  const clubId = payload.id;
  const url = `/departments/${clubId}`;
  const updateValue = {
    ...payload,
    "uni-id": 1
  };
  return axiosClient.put(url, updateValue);
}

export async function createDepartment (payload) {
  const url = "/departments";
  const newClub = {
    ...payload,
    "uni-id": 1
  };
  return axiosClient.post(url, newClub);
}
