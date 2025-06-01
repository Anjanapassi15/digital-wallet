const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// @route    POST /api/auth/register
// @desc     Register a new user
// @access   Public
router.post('/register', async (req, res) => {
  console.log("📩 Register route hit"); // To confirm route is working

  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword
    });

    // Save user to database
    await newUser.save();

    // Success response
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error("❌ Registration error:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
