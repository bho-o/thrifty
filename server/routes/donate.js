const express = require('express');
const router = express.Router();
const Donate = require('../models/Donate');

router.post('/donate', async (req, res) => {
  try {
    const { userId, type, weight, quality } = req.body;

    // Validate input
    if (!userId || !type || !weight || !quality) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (isNaN(weight) || weight <= 0) {
      return res.status(400).json({ message: 'Weight must be a positive number' });
    }

    // Create new donation item
    const donateItem = new Donate({
      userId,
      type,
      weight: Number(weight),
      quality,
      price: 0 // Enforce free price for donations
    });

    // Save to database
    await donateItem.save();

    res.status(201).json({ 
      message: 'Donation submitted successfully', 
      item: donateItem 
    });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;