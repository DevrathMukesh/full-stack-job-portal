import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Optional: Add a timeout to prevent hanging indefinitely
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000, // Timeout after 10 seconds
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process if connection fails
    }
};

export default connectDB;
