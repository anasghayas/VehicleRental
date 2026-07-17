const User = require('../models/User');

// GET /api/admin/users

exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find({ _id: { $ne: req.user.id } })
      .select('-password')
      .sort({ createdAt: -1 }); // Newest first
      
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch all users error:", error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
};
