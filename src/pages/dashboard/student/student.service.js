import axiosClient from "../../../util/axiosClient";

export const getStudentList = async (params) => {
  const url = "/students";
  return axiosClient.get(url, { params });
};

export async function updateStudent (payload) {
  const clubId = payload.id;
  const url = `/departments/${clubId}`;
  const updateValue = {
    ...payload
  };
  return axiosClient.put(url, updateValue);
}

export async function createStudent (payload) {
  const url = "/departments";
  const newClub = {
    ...payload
  };
  return axiosClient.post(url, newClub);
}
