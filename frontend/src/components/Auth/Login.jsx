import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import { FaExclamationTriangle, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      login(token); // Update context
      localStorage.setItem("token", token); // Persist token
      navigate(from, { replace: true });
    } catch (err) {
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

        {error && (
          <div className="flex items-center gap-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm">
            <FaExclamationTriangle className="text-red-500" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>

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
