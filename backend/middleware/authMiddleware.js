import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(" ")[1];
      console.log("Token received:", token); // Check token format

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); // Check decoded values

      // Find user by decoded ID
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        console.log("User not found");
        return res.status(401).json({ message: "User not found" });
      }

      // Proceed to next middleware
      next();
    } catch (error) {
      console.error("JWT verification failed:", error.message); // Check errors
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.warn("No token provided");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;
