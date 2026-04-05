const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Type is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Record', recordSchema);
