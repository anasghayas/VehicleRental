const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
require('dotenv').config(); 

const app = express();

app.use(cors()); 
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB !'))
    .catch((err) => console.log('Failed to connect to MongoDB:', err));

app.get('/', (req, res) => {
    res.send('Welcome to the GoVroom API! The server is running perfectly.');
});

app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
    require('fs').appendFileSync('global_error.log', 'GLOBAL ERROR: ' + err.stack + '\n');
    res.status(500).json({ message: "Global server error." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running beautifully on port ${PORT}`);
});
