import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Get the token from the cookies
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated: No token provided.",
                success: false,
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Attach the decoded userId to the request object
        req.id = decoded.userId;
        
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error); // Log the error for debugging

        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token has expired. Please login again.",
                success: false,
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token. Please provide a valid token.",
                success: false,
            });
        }

        // Handle other unexpected errors
        return res.status(500).json({
            message: "Something went wrong with token verification.",
            success: false,
        });
    }
};

export default isAuthenticated;
