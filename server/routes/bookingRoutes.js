const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { auth } = require('../middleware/auth');
const role = require('../middleware/role');
router.post('/', auth, role(['customer']), bookingController.createBooking);
router.get('/my-bookings', auth, role(['customer']), bookingController.getMyBookings);

module.exports = router;
