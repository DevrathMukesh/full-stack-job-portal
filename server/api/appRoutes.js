import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/appController.js";
 
const router = express.Router();

// Apply for a job (POST instead of GET)
router.route("/apply/:id").get(isAuthenticated, applyJob);

// Get jobs the user has applied to
router.route("/my-applied-jobs").get(isAuthenticated, getAppliedJobs);

// Get applicants for a specific job
router.route("/:id/applicants").get(isAuthenticated, getApplicants);

// Update the status of an application
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
