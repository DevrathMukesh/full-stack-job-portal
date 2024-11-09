import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Trim spaces around the name
    },
    description: {
      type: String,
      default: "No description provided.", // Default description
      trim: true, // Trim spaces around the description
    },
    website: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Simple URL validation
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    location: {
      type: String,
      default: "Location not provided.", // Default location if not provided
    },
    logo: {
      type: String, // URL to company logo, could be empty if not provided
      default: "https://via.placeholder.com/150", // Default logo URL (if no logo is provided)
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Optionally, create indexes for fields that will be queried frequently
companySchema.index({ userId: 1 });

export const Company = mongoose.model("Company", companySchema);
