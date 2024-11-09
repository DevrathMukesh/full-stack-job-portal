import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js";
import { singleUpload } from "../middleware/multerMiddleware.js";

const router = express.Router();

// Register a new company
router.route("/register").post(isAuthenticated, registerCompany);

// Get all companies for the authenticated user
router.route("/my-companies").get(isAuthenticated, getCompany);

// Get details of a specific company by its ID
router.route("/get/:id").get(isAuthenticated, getCompanyById);

// Update a company's details by ID
router.route("/update-company/:id").put(isAuthenticated, singleUpload, updateCompany);

export default router;
