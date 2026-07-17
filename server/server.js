const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running beautifully on port ${PORT}`);
});
