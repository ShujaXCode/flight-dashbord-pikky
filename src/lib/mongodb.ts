/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import mongoose from "mongoose";

const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  await mongoose.connect(process.env.MONGO_URI || "");
  console.log("Connected to MongoDB");
};

export default connectMongo;
