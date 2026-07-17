const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { auth } = require('../middleware/auth');
const role = require('../middleware/role');


router.post('/', auth, role(['agency']), vehicleController.addVehicle);
router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);
router.put('/:id', auth, role(['agency']), vehicleController.updateVehicle);
router.delete('/:id', auth, role(['agency']), vehicleController.deleteVehicle);

module.exports = router;
