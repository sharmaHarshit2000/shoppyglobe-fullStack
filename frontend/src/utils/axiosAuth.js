import axios from "./axiosInstance";

// Create a new axios instance 
const axiosAuth = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for backend API
});

// Add a request interceptor to automatically attach the Authorization token
axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  if (token) {
    // If a token exists, add it to the request headers
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // Return the modified config
});


export default axiosAuth;
