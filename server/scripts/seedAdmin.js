const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        const adminEmail = "admin@govroom.com";
    
        const adminExists = await User.findOne({ email: adminEmail });
        if (adminExists) {
            console.log("Admin account already exists! No need to run this again.");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("AdminPassword123!", 10);
        const admin = new User({
            name: "GoVroom Master Admin",
            email: adminEmail,
            password: hashedPassword,
            phone: "000-000-0000",
            role: "admin",
            isApproved: true 
        });

        await admin.save();
        console.log("========================================");
        console.log("✅ Default Admin Account successfully created!");
        console.log(`Email:    ${adminEmail}`);
        console.log("Password: AdminPassword123!");
        console.log("========================================");

        process.exit(0);

    } catch (error) {
        console.error("Error creating admin account:", error);
        process.exit(1);
    }
};

seedAdmin();
