const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { auth } = require('../middleware/auth');
const role = require('../middleware/role');
router.post('/', auth, role(['customer']), bookingController.createBooking);
router.get('/my-bookings', auth, role(['customer']), bookingController.getMyBookings);
router.get('/agency', auth, role(['agency']), bookingController.getAgencyBookings);
router.put('/:id/status', auth, role(['agency']), bookingController.updateBookingStatus);

module.exports = router;
