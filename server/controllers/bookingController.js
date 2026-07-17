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

// GET /api/bookings/agency
// Private (Agency only) - Fetch all bookings made for vehicles owned by this agency
exports.getAgencyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ agencyId: req.user.id })
      .populate('vehicleId', 'name brand type imageUrl')
      .populate('customerId', 'name email phone') // We need to see who rented it!
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch agency bookings error:", error);
    res.status(500).json({ message: "Server error while fetching agency bookings." });
  }
};

// PUT /api/bookings/:id/status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['approved', 'rejected', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status update." });
    }
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    if (booking.agencyId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this booking." });
    }


    booking.status = status;
    await booking.save();

    res.status(200).json({ message: `Booking marked as ${status}.`, booking });
  } catch (error) {
    console.error("Update booking status error:", error);
    res.status(500).json({ message: "Server error while updating booking status." });
  }
};
