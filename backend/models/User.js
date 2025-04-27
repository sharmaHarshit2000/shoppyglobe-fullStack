import mongoose from "mongoose";

// Regex to enforce strong password rules
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    minlength: [3, "Full name must be at least 3 characters long"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    // Validate email format using regex
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    // Custom validator function for strong password checking
    validate: {
      validator: function (value) {
        return passwordRegex.test(value);
      },
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
    },
  },
});

const User = mongoose.model("User", userSchema);
export default User;
