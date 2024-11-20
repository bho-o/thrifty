const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sellRoutes = require('./routes/sell');
const donateRoutes = require('./routes/donate');
const profileRoutes = require('./routes/profile');
const signupRoutes = require('./routes/signup');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/connect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', sellRoutes);
app.use('/api', donateRoutes);
app.use('/api', profileRoutes);
app.use('/api',signupRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

