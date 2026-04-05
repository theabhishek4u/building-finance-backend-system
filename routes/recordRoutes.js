const express = require('express');
const router = express.Router();
const {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
} = require('../controllers/recordController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All records routes are protected
router.use(protect);

// Analysts and Admins can view records
router.route('/').get(authorize('admin', 'analyst'), getRecords);
router.route('/:id').get(authorize('admin', 'analyst'), getRecord);

// Only Admins can modify records
router.route('/').post(authorize('admin'), createRecord);
router.route('/:id').put(authorize('admin'), updateRecord).delete(authorize('admin'), deleteRecord);

module.exports = router;
