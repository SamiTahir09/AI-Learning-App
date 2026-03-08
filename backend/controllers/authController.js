import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Salt round
const salt = 10;

// POST     api register
//    api/auth/register
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //if user exist
    const userExists = await User.findOne({ $or: [{ email }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error:
          userExists === email
            ? "Email already registered"
            : "Username already taken",
        statusCode: 400,
      });
    }
    //hash password
    const hashpassword = bcrypt.hash(password, salt);
    // create user
    const user = await User.create({
      username,
      email,
      password: hashpassword,
    });

    //token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
          createdAt: user.createdAt,
        },
        token,
      },
      message: "User registered successfully",
    });
  } catch (error) {}
};

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
