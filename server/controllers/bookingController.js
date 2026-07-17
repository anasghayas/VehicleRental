const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

// POST /api/bookings
// Private (Customer only) - Creates a new rental request
exports.createBooking = async (req, res) => {
  try {
    const { vehicleId, startDate, endDate, totalPrice } = req.body;
    if (!vehicleId || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ message: "Please provide all booking details." });
    }
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found." });
    }
    if (vehicle.agencyId.toString() === req.user.id) {
       return res.status(400).json({ message: "You cannot book your own vehicle." });
    }
    const booking = new Booking({
      customerId: req.user.id,   
      agencyId: vehicle.agencyId,  
      vehicleId,
      startDate,
      endDate,
      totalPrice
    });

    await booking.save();
    
    res.status(201).json({ message: "Booking requested successfully!", booking });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: "Server error while creating booking." });
  }
};

// GET /api/bookings/my-bookings
// Private (Customer only) - Fetch all bookings made by the logged-in customer
exports.getMyBookings = async (req, res) => {
  try {
    // Find all bookings for this customer and populate the vehicle and agency details
    const bookings = await Booking.find({ customerId: req.user.id })
      .populate('vehicleId', 'name brand type imageUrl')
      .populate('agencyId', 'agencyName phone')
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch my bookings error:", error);
    res.status(500).json({ message: "Server error while fetching your bookings." });
  }
};
