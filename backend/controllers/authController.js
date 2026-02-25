import jwt from "jsonwebtoken";
import User from "../models/User.js";

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

export const register = () => {};
export const login = () => {};
export const getProfile = () => {};
export const updateProfile = () => {};
export const changePassword = () => {};
