import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'shortlisted', 'interviewed'],  // Added more statuses as examples
        default: 'pending'
    }
}, { timestamps: true });

// Indexes for faster querying
applicationSchema.index({ job: 1, applicant: 1 }); // index by job and applicant

// Create the model from the schema
export const Application = mongoose.model("Application", applicationSchema);
