const jwt = require('jsonwebtoken');

// This middleware acts as a security guard for protected routes
const auth = (req, res, next) => {
    // 1. Grab the token from the request header (it usually looks like "Bearer <token_string>")
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: "Access denied. Invalid token format." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        if (decoded.userId) req.user.id = decoded.userId;
        
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = { auth };
