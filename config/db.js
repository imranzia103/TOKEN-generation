import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection Established : Sucessfully !!");
  } catch (error) {
    throw new Error("NOt Connected");
  }
};

export default connectDB;
