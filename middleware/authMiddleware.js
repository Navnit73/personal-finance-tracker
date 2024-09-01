// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

const protect = async (req, res, next) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      logger.error(`Auth error: ${error.message}`);
      res.status(401).json({ success: false, message: 'Not authorized' });
    }
  }
  
  if (!token) {
    res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }
};

module.exports = { protect };
