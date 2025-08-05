const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register User
exports.register = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user instance
    user = new User({ name, email, password });

    // Save user (assumes password hashing in User model pre-save hook)
    await user.save();

    // Prepare JWT payload
    const payload = {
      userId: user._id,
      role: user.role,
    };

    // Sign token with 7 days expiration
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });

    // Send response with token and user info
    res.json({
      token,
      user: {
        id: user._id,
        name,
        email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Register Error:', err.message);
    return res.status(500).send('Server error');
  }
};

// Login User
exports.login = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email, explicitly include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Prepare JWT payload
    const payload = {
      userId: user._id,
      role: user.role,
    };

    // Sign token with 7 days expiration
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });

    // Send response with token and user info
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    return res.status(500).send('Server error');
  }
};
