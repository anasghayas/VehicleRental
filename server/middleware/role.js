// This middleware checks if the user has the correct role
// It must be used AFTER the auth middleware, because it relies on req.user existing
const role = (allowedRolesArray) => {
    return (req, res, next) => {
        // If the user's role is NOT inside the list of allowed roles
        // Example: allowedRolesArray is ['agency', 'admin'], but req.user.role is 'customer'
        if (!allowedRolesArray.includes(req.user.role)) {
            return res.status(403).json({ 
                message: "Access forbidden. You do not have the required permissions to do this." 
            });
        }
        next();
    };
};

module.exports = role;
