const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { auth } = require('../middleware/auth');
const role = require('../middleware/role');


router.use(auth, role(['admin']));


router.get('/users', adminController.getAllUsers);
router.put('/users/:id/approve', adminController.approveAgency);
router.put('/vehicles/:id/approve', adminController.approveVehicle);
router.get('/bookings', adminController.getAllBookings);

module.exports = router;
