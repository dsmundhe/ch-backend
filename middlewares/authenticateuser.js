import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
dotenv.config();
const authenticateUser = (req, res, next) => {
    const token = req.cookies.token; // Get the token from cookies
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
        req.user = decoded; // Attach the decoded data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Invalid token:', err);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

export default authenticateUser;
