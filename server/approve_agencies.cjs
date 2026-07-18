require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    // Find all agency users and set isApproved to true
    const result = await User.updateMany({ role: 'agency' }, { $set: { isApproved: true } });
    console.log(`Approved ${result.modifiedCount} agency accounts!`);
    process.exit(0);
  })
  .catch(err => {
    console.error("Error:", err);
    process.exit(1);
  });
