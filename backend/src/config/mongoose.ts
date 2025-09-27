import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connectd Database Succfeully");
  } catch (err) {
    console.log("Something Went Wrong .Not able tp connect database");
  }
};

export default connectDb;