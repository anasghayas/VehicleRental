const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  modelYear: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['2W', '4W'],
    required: true
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    required: true
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic'],
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  pricePerWeek: {
    type: Number,
    required: true
  },
  pricePerMonth: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Available', 'Rented', 'Maintenance'],
    default: 'Available'
  },
  isAdminApproved: {
    type: Boolean,
    default: false // Admin must approve before customers can see it
  },
  location: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
