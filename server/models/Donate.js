const mongoose = require('mongoose');

const donateSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  quality: {
    type: String,
    required: true,
    enum: ['Excellent', 'Good', 'Fair', 'Poor']
  },
  price: {
    type: Number,
    default: 0 // Donations are always free
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donate', donateSchema);