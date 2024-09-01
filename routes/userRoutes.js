// routes/userRoutes.js
const express = require('express');
const { check } = require('express-validator');
const {
  registerUser,
  loginUser,
} = require('../controllers/userController');

const router = express.Router();

// @route   POST /api/users
// @desc    Register a new user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  registerUser
);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

module.exports = router;
