import express from "express";
import { login, logout, register, updateProfile } from "../controllers/userController.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multerMiddleware.js";

const router = express.Router();

// Register a new user (with profile photo upload)
router.route("/register").post(singleUpload, register);

// Login user
router.route("/login").post(login);

// Logout user
router.route("/logout").get(logout);

// Update authenticated user's profile
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

export default router;
