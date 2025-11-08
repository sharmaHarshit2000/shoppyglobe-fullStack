import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Password validation function: checks for length, uppercase, lowercase, number, and special character
  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    return regex.test(pwd);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordError("");

    // Validate password strength before sending to server
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      // API call to register a new user
      await axios.post("/auth/register", {
        fullName: name,
        email,
        password,
      });

      // Show success toast on successful account creation
      toast.success("Account created successfully!", {
        position: "top-center",
        autoClose: 2500,
      });

      // Redirect user to login page after slight delay
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      // Handle and show API error message
      const message = err.response?.data?.message || "Signup failed";
      setError(message);
      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-gray-50 p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-200 transition-all duration-300">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
          Create an Account
        </h2>

        {/* Error message display */}
        {error && (
          <div className="text-red-600 text-sm text-center mb-4 font-medium bg-red-100 border border-red-300 p-2 rounded transition-all duration-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
              placeholder="Harshit Sharma"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
              placeholder="abc@gmail.com"
            />
          </div>

          {/* Password Input with show/hide toggle */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800 pr-10"
              placeholder="••••••••"
            />
            {/* Toggle password visibility */}
            <div
              className="absolute right-3 top-[42px] transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>

            {/* Show password error if validation fails */}
            {passwordError && (
              <p className="mt-2 text-xs text-red-600 bg-red-50 border border-red-200 p-2 rounded-md font-medium transition-all duration-300">
                {passwordError}
              </p>
            )}
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-sm"
          >
            Create Account
          </button>
        </form>

        {/* Link to Login Page */}
        <p className="text-sm text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
