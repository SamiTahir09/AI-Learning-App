import express, { Router } from "express";
import { body } from "express-validator";

import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const authRouter = express.Router();

//validation middleware
const registerValidation = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 charcters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// public routes
authRouter.post("/register", registerValidation, register);
authRouter.post("login", loginValidation, login);

//protected routes
authRouter.get("profile", protect, getProfile);
authRouter.put("/profile", protect, updateProfile);
authRouter.post("/change-password", protect, changePassword);

export default authRouter;
