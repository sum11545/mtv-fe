// axiosInstance.js

import axios from "axios";

const createAxiosInstance = () => {
  // const accessToken = window.localStorage.getItem("accessToken");

  const axiosInstance = axios.create({
    baseURL: `http://localhost:3700/api/v1`,
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
  });

  return axiosInstance;
};

export default createAxiosInstance;
