import { Application } from "../models/appModel.js";
import { Job } from "../models/jobModel.js";
import mongoose from 'mongoose';

// MongoDB connection utility (if needed in serverless environment)
const connectToDB = async () => {
    if (mongoose.connections[0].readyState) return; // Use existing connection if it exists
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
};

// Apply for a job
export const applyJob = async (req, res) => {
    try {
        await connectToDB(); // Ensure DB connection

        const userId = req.id;
        const jobId = req.params.id;

        // Validate job ID
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        // Check if user has already applied
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Create a new application
        const newApplication = new Application({
            job: jobId,
            applicant: userId,
        });
        await newApplication.save();

        // Update job's applications array
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Get all applied jobs for a user
export const getAppliedJobs = async (req, res) => {
    try {
        await connectToDB(); // Ensure DB connection

        const userId = req.id;
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } },
                }
            });

        if (!applications.length) {
            return res.status(404).json({
                message: "No applications found.",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Get all applicants for a job
export const getApplicants = async (req, res) => {
    try {
        await connectToDB(); // Ensure DB connection

        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Update application status (pending, accepted, rejected)
export const updateStatus = async (req, res) => {
    try {
        await connectToDB(); // Ensure DB connection

        const { status } = req.body;
        const applicationId = req.params.id;

        // Validate status
        if (!status || !['pending', 'accepted', 'rejected'].includes(status.toLowerCase())) {
            return res.status(400).json({
                message: 'Valid status is required (pending, accepted, or rejected).',
                success: false
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        // Update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
