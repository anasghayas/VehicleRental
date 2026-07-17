const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

exports.addVehicle = async (req, res) => {
  try {
    // 1. Get the agency who is trying to add the vehicle
    const agency = await User.findById(req.user.id);
    
    // 2. Make sure they are actually approved by an Admin!
    if (!agency.isApproved) {
      return res.status(403).json({ 
        message: "Your agency account must be approved by an Admin before you can list vehicles." 
      });
    }

    // 3. Prepare the vehicle data. We force the agencyId to be the logged-in user's ID
    // so they can't pretend to be another agency!
    const vehicleData = {
      ...req.body,
      agencyId: req.user.id
    };

    // 4. Save to database
    const newVehicle = new Vehicle(vehicleData);
    await newVehicle.save();

    res.status(201).json({
      message: "Vehicle added successfully! It is now waiting for Admin approval.",
      vehicle: newVehicle
    });

  } catch (error) {
    console.error("Error adding vehicle:", error);
    
    if (error.code === 11000) {
      return res.status(400).json({ message: "A vehicle with this registration number already exists." });
    }
    
    res.status(500).json({ message: "Server error while adding vehicle." });
  }
};

// GET /api/vehicles
// Public access - anyone can browse approved cars!
exports.getAllVehicles = async (req, res) => {
  try {
    let query = { isAdminApproved: true };

    if (req.query.location) {
      query.location = { $regex: req.query.location, $options: 'i' };
    }
    if (req.query.type) {
      query.type = req.query.type;
    }
    if (req.query.brand) {
      query.brand = { $regex: req.query.brand, $options: 'i' };
    }

    const vehicles = await Vehicle.find(query).populate('agencyId', 'name email agencyName');

    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ message: "Server error while fetching vehicles." });
  }
};
