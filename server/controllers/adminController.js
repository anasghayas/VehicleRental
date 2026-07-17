const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

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

// PUT /api/admin/users/:id/approve

exports.approveAgency = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Only agencies need approval
    if (user.role !== 'agency') {
      return res.status(400).json({ message: "Only agency accounts require approval." });
    }

    user.isApproved = true;
    await user.save();


    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(200).json({ message: "Agency approved successfully.", user: safeUser });
  } catch (error) {
    console.error("Approve agency error:", error);
    res.status(500).json({ message: "Server error while approving agency." });
  }
};

// PUT /api/admin/vehicles/:id/approve

exports.approveVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found." });
    }

    vehicle.isAdminApproved = true;
    await vehicle.save();

    res.status(200).json({ message: "Vehicle approved successfully.", vehicle });
  } catch (error) {
    console.error("Approve vehicle error:", error);
    res.status(500).json({ message: "Server error while approving vehicle." });
  }
};

// GET /api/admin/bookings

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('vehicleId', 'name brand type vehicleNumber imageUrl')
      .populate('customerId', 'name email phone')
      .populate('agencyId', 'agencyName email phone')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch all bookings error:", error);
    res.status(500).json({ message: "Server error while fetching bookings." });
  }
};
