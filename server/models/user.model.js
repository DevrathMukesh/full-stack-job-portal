import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address."],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required."],
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: [true, "User role is required."],
    },
    profile: {
      bio: {
        type: String,
        default: "",
      },
      skills: {
        type: [String],
        default: [],
      },
      resume: {
        type: String, // URL to resume file
      },
      resumeOriginalName: {
        type: String,
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

// Index email for quick lookup
userSchema.index({ email: 1 });

export const User = mongoose.model("User", userSchema);
