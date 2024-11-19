const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

router.post('/profile/save', async (req, res) => {
  try {
    const { name, email, phone_no, address } = req.body;

    // Basic validation
    if (!name || !email || !phone_no || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find existing profile or create new one
    let profile = await Profile.findOne();
    
    if (profile) {
      // Update existing profile
      profile.name = name;
      profile.email = email;
      profile.phone_no = phone_no;
      profile.address = address;
      profile.updatedAt = new Date();
    } else {
      // Create new profile
      profile = new Profile({
        name,
        email,
        phone_no,
        address,
      });
    }

    await profile.save();
    res.status(200).json({ message: 'Profile saved successfully', profile });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Server error saving profile' });
  }
});

module.exports = router;