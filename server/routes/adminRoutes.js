const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { auth } = require('../middleware/auth');
const role = require('../middleware/role');


router.use(auth, role(['admin']));


router.get('/users', adminController.getAllUsers);

module.exports = router;
