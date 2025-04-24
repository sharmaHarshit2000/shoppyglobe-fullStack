import User from "../models/User.js";

// Controller to get user information
export const getUserProfile = async (req, res) => {
  try {
    // req.user will be populated by the protect middleware
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to update user profile 
export const updateUserProfile = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
