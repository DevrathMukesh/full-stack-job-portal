import { Job } from "../models/jobModel.js";

// Admin posts a job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        // Check for missing fields
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Some required fields are missing.",
                success: false
            });
        }

        // Create new job
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(",").map(req => req.trim()),  // Clean up requirements array
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error(error);  // Log error
        return res.status(500).json({
            message: "Something went wrong while creating the job.",
            success: false
        });
    }
};

// Student gets all jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""; // Default to empty string if no keyword
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found matching the search criteria.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error(error);  // Log error
        return res.status(500).json({
            message: "Something went wrong while fetching jobs.",
            success: false
        });
    }
};

// Student gets job details by ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error(error);  // Log error
        return res.status(500).json({
            message: "Something went wrong while fetching the job details.",
            success: false
        });
    }
};

// Admin gets all jobs posted by them
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company'
        }).sort({ createdAt: -1 });  // Corrected sorting position

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found for this admin.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error(error);  // Log error
        return res.status(500).json({
            message: "Something went wrong while fetching jobs for the admin.",
            success: false
        });
    }
};
