// utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add interceptor to handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and reload page or redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login"; // Or use React router navigate if you're inside a component
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
