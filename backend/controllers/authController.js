import jwt from "jsonwebtoken";
import User from "../models/User.js";

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// POST     api register
//    api/auth/register
export const register = async (req, res, next) => {};

// Post     api Login
//    api/auth/login
export const login = async (req, res, next) => {};

// GET     api Getprofile
//    api/auth/profile
export const getProfile = async (req, res, next) => {};

// PUT     api update user profile
//    api/auth/profile
export const updateProfile = async (req, res, next) => {};

// post     api change password
//    api/auth/change-password
export const changePassword = async (req, res, next) => {};
