// axiosInstance.js

import axios from "axios";

const createAxiosInstance = () => {
  // const accessToken = window.localStorage.getItem("accessToken");

  const axiosInstance = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3700/api/v1",
    baseURL:
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://moneytv.live/api/v1",
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
  });

  return axiosInstance;
};

export default createAxiosInstance;
