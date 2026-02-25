import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error connecting to MongoDb:${error.message}`);
    process.exit(1);
  }
};
export default connectDb;
