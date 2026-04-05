const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Mock Authentication Middleware
 * In a real app, this would verify a JWT.
 * For this assignment, we'll use a custom header 'x-user-id' to simulate the logged-in user.
 */
const protect = async (req, res, next) => {
  let userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ message: 'Not authorized, no user ID provided' });
  }

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    if (user.status === 'inactive') {
        return res.status(403).json({ success: false, message: 'User account is inactive. Access denied.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, invalid connection to user data' });
  }
};

/**
 * Role-Based Access Control Middleware
 * @param {...string} roles - Allowed roles for this endpoint
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role '${req.user?.role || 'unknown'}' is not authorized to access this route`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
