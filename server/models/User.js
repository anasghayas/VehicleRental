const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'agency', 'admin'], 
        default: 'customer'
    },
    agencyName: {
        type: String
    },
    isApproved: {
        type: Boolean,
        default: false 
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
