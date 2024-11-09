import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    try {
        if (!file || !file.originalname || !file.buffer) {
            throw new Error("Invalid file: Missing required properties.");
        }

        const parser = new DataUriParser();
        const extName = path.extname(file.originalname).toString().toLowerCase();

        // Optionally, validate the file extension (e.g., for image types)
        const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif"];
        if (!allowedExtensions.includes(extName)) {
            throw new Error("Unsupported file type.");
        }

        return parser.format(extName, file.buffer);
    } catch (error) {
        console.error("Error in getDataUri:", error.message);
        throw error;
    }
};

export default getDataUri;
