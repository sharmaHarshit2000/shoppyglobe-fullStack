import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to MongoDB using the MONGO_URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);

    // If connection fails, exit the process immediately with a failure code
    process.exit(1);
  }
};

export default connectDB;
