import axios from "axios";

// call api - default page 1, size 10
export const getClubs = async (current = 1, pageSize = 10) => {
  const res = await axios.get(process.env.REACT_APP_API_URL + "clubs", {
    params: {
      "uni-id": localStorage.getItem("uniID"),
      "page-number": current,
      "page-size": pageSize
    }
  });
  return res.data.data;
};

export const getClubByID = async (id) => {
  const res = await axios.get(process.env.REACT_APP_API_URL + "clubs/" + id);
  return res.data.data;
};

export const createClub = async (club) => {
  const res = await axios.post(process.env.REACT_APP_API_URL + "clubs", {
    ...club,
    "uni-id": localStorage.getItem("uniID"),
    "avatar-url": ""
  });
  return res;
};

export const editClub = async (club) => {};
