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
