import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Job description is required."],
    },
    requirements: [
      {
        type: String,
      },
    ],
    salary: {
      type: Number,
      required: [true, "Salary is required."],
      min: [0, "Salary cannot be negative."],
    },
    experienceLevel: {
      type: Number,
      required: [true, "Experience level is required."],
      min: [0, "Experience level cannot be negative."], // Ensure non-negative values
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      trim: true,
    },
    jobType: {
      type: String,
      required: [true, "Job type is required."],
      enum: ["Full-time", "Part-time", "Contract", "Temporary", "Internship"],
    },
    position: {
      type: Number,
      required: [true, "Position level or count is required."],
      min: [1, "Position count or level must be at least 1."],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

// Index frequently queried fields
jobSchema.index({ location: 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ company: 1 });

export const Job = mongoose.model("Job", jobSchema);
