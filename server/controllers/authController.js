const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, role, agencyName } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "A user with this email already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword, 
            phone,
            role: role || 'customer', 
            agencyName: role === 'agency' ? agencyName : undefined
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." }); 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // 3. Create the "Digital ID Card" (JWT token)
        const token = jwt.sign(
            { userId: user._id, role: user.role, isApproved: user.isApproved }, // Payload (data inside token)
            process.env.JWT_SECRET, // The secret key from our .env file
            { expiresIn: '7d' } // The user stays logged in for 7 days
        );

        res.status(200).json({
            message: "Login successful!",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};
