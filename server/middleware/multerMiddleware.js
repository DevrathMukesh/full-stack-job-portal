import multer from "multer";

// Set up memory storage for file uploads
const storage = multer.memoryStorage();

// File type and size validation
const fileFilter = (req, file, cb) => {
    // Accept only certain file types (e.g., images)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Only images are allowed.'));
    }
    cb(null, true);
};

// Configure multer with storage, file filter, and size limit
export const singleUpload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
}).single("file");
