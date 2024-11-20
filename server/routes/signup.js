const express = require('express');
const router = express.Router();
const Signup = require('../models/Profile');

router.post('/signup/save', async (req, res) => {
  try {
    const { username, email,password} = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    //finding profile
    let signup = await Signup.findOne();
    
    if (signup) {
      // Updating existing profile
      signup.username = username;
      signup.email = email;
      signup.password = password;
      signup.updatedAt = new Date();
    } else {
      // Creating our new profile
      signup = new Signup({
        username,
        email,
        password,
      });
    }

    await signup.save();
    res.status(200).json({ message: 'Details saved successfully', profile });
  } catch (error) {
    console.error('Error saving details:', error);
    res.status(500).json({ message: 'Server error saving details' });
  }
});

module.exports = router;