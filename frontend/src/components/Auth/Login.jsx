import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate, useLocation, Link } from "react-router-dom"; 
import axios from "../../utils/axiosInstance"; 
import { FaExclamationTriangle, FaEye, FaEyeSlash } from "react-icons/fa"; 

function Login() {
  // State variables to store user input and UI states
  const [email, setEmail] = useState(""); // Email input
  const [password, setPassword] = useState(""); // Password input
  const [showPassword, setShowPassword] = useState(false); // Toggle show/hide password
  const [error, setError] = useState(""); // Error message

  const { login } = useAuth(); // Get login method from AuthContext
  const navigate = useNavigate(); // For navigating after successful login
  const location = useLocation(); // To get the page user tried to access before login

  // If user came from a protected route, redirect back to it after login, otherwise home
  const from = location.state?.from?.pathname || "/";

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form reload
    setError(""); // Clear previous errors

    try {
      // Make API call to backend to login
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token; // Extract token from server response

      login(token); // Update Auth Context (so whole app knows user is logged in)
      localStorage.setItem("token", token); // Save token in browser 

      navigate(from, { replace: true }); // Redirect to previous page or home after login
    } catch (err) {
      // If error from server, display it
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Welcome Back
        </h2>

        {/* Show error message */}
        {error && (
          <div className="flex items-center gap-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm">
            <FaExclamationTriangle className="text-red-500" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Email and Password Inputs */}
        <div className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input with show/hide toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Password"
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Eye icon for toggling password visibility */}
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>

        {/* Link to signup page */}
        <p className="text-center text-sm text-gray-600 mt-2">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
