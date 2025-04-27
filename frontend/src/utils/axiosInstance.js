import axios from "axios";

// Create a custom axios instance for making API requests
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for backend API
});

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  (error) => {
    // If the server responds with an error
    if (error.response && error.response.status === 401) {
      // If error status is 401 (Unauthorized)

      // Clear the stored token from localStorage (because it's invalid/expired)
      localStorage.removeItem("token");

      // Redirect the user to the login page
      window.location.href = "/login";
    }

    // Reject the error 
    return Promise.reject(error);
  }
);


export default axiosInstance;
