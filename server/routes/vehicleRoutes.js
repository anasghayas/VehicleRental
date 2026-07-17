const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { auth } = require('../middleware/auth');
const role = require('../middleware/role');


router.post('/', auth, role(['agency']), vehicleController.addVehicle);
router.get('/', vehicleController.getAllVehicles);

module.exports = router;
