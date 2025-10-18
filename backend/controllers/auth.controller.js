// backend/controllers/auth.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide an email and password.' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const newUser = await User.create({ email, password });

    res.status(201).json({ message: 'User registered successfully!', userId: newUser.id });

  } catch (error) {
    res.status(500).json({ message: 'Server error during registration.', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide an email and password.' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email
      },
    };
    jwt.sign(
      payload,
      'jwtSecret', 
      { expiresIn: '1h' }, 
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );

  } catch (error) {
    res.status(500).json({ message: 'Server error during login.', error: error.message });
  }
};
const crypto = require('crypto');
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'No user with that email found.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour

    await user.save();
    console.log('--- PASSWORD RESET ---');
    console.log(`User: ${email}`);
    console.log(`Reset Token: ${resetToken}`);
    console.log(`Reset Link (for simulation): http://localhost:4200/reset-password/${resetToken}`);
    console.log('--------------------');
    
    res.status(200).json({ message: 'Password reset token generated. Check the backend console for the token.' });

  } catch (error) {
    res.status(500).json({ message: 'Error on forgot password.', error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: resetToken,
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    
    await user.save();

    res.status(200).json({ message: 'Password has been updated successfully.' });

  } catch (error) {
    res.status(500).json({ message: 'Error resetting password.', error: error.message });
  }
};