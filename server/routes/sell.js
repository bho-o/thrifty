const express = require('express');
const router = express.Router();
const Sell = require('../models/Sell');

router.post('/sell', async (req, res) => {
  try {
    const { userId, type, weight, price, quality } = req.body;

    // Validate input
    if (!userId || !type || !weight || !price || !quality) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (isNaN(weight) || weight <= 0) {
      return res.status(400).json({ message: 'Weight must be a positive number' });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: 'Price must be a positive number' });
    }

    // Create new sell item
    const sellItem = new Sell({
      userId,
      type,
      weight: Number(weight),
      price: Number(price),
      quality
    });

    // Save to database
    await sellItem.save();

    res.status(201).json({ message: 'Sell item created successfully', item: sellItem });
  } catch (error) {
    console.error('Error creating sell item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;