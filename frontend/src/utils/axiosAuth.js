import axiosInstance from "./axiosInstance"; 


const axiosAuth = axiosInstance; 

// Add Authorization header via request interceptor
axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosAuth;
