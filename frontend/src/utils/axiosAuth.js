import axios from "./axiosInstance";

const axiosAuth = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust based on your backend API URL
});

axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosAuth;
