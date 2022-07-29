import axiosClient from 'util/axiosClient';

export async function getBlogList(params) {
  const url = '/blogs';
  return axiosClient.get(url, { params });
}

export async function getBlogDetail(params) {
  const url = `/blogs/${params}`;
  return axiosClient.get(url, { params });
}
