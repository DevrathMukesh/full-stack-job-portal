import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/jobController.js";

const router = express.Router();

// Post a new job (only accessible to authenticated users)
router.route("/post").post(isAuthenticated, postJob);

// Get all available jobs (for students/applicants)
router.route("/available-jobs").get(isAuthenticated, getAllJobs);

// Get jobs posted by the authenticated admin/recruiter
router.route("/admin-jobs").get(isAuthenticated, getAdminJobs);

// Get details of a specific job by ID
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;
