const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All roles (Admin, Analyst, Viewer) can view dashboard summary
router.route('/summary').get(protect, authorize('admin', 'analyst', 'viewer'), getSummary);

module.exports = router;
