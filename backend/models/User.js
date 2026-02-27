import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Provide a username"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be atleast 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please Provide an email"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password must be atleast 3 characters long"],
      select: false,
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
