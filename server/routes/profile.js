const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Route to save a new profile
router.post('/profile/save', async (req, res) => {
  try {
    const { name, email, phone_no, address } = req.body;

    // Basic validation
    if (!name || !email || !phone_no || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new profile entry in the database
    const newProfile = new Profile({
      name,
      email,
      phone_no,
      address,
    });

    const savedProfile = await newProfile.save();
    res.status(200).json({ message: 'Profile saved successfully', profile: savedProfile });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Server error saving profile' });
  }
});

// Route to update an existing profile
router.put('/profile/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone_no, address } = req.body;

    // Basic validation
    if (!name || !email || !phone_no || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the profile by ID and update it
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { name, email, phone_no, address },
      { new: true } // Return the updated document
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

// Route to get all profiles
router.get('/profile/all', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ message: 'Server error fetching profiles' });
  }
});

module.exports = router;

