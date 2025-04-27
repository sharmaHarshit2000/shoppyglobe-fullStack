import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const getUserProfile = async (req, res) => {
  try {
    // req.user will be received by the protect middleware
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user's profile details, excluding the password
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: err.message });
  }
};


export const updateUserProfile = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided, otherwise keep the existing values
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;

    // If a password is provided, hash it and update
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user
    const updatedUser = await user.save();

    // Respond with the updated user profile
    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
    });
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({ message: err.message });
  }
};
