import mongoose from "mongoose";

export const connectDB = async () => {
  const { connection } = await mongoose.connect("mongodb+srv://lakshit_juneja:2FTB3NtmQ4l23V8J@cluster0.6q9oq9v.mongodb.net/bullseyeburgers?retryWrites=true");

  console.log(`Database is connect with ${connection.host}`);
};
