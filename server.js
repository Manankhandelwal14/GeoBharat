require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const Area = require('./models/area.js');

const app = express();

// Log the Mongo URI
console.log("MongoDB URI from .env:", process.env.MONGO_URI);

// ✅ Connect to MongoDB using the reusable function
connectDB();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.get('/api/area/:pincode', async (req, res) => {
  try {
    const pincode = String(req.params.pincode).trim(); // force to string and trim
    const area = await Area.findOne({ pincode });

    if (!area) {
      return res.status(404).json({ success: false, message: 'No information found for this pincode' });
    }

    res.json({ success: true, data: area });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/pincodes', async (req, res) => {
  try {
    const areas = await Area.find({}, 'pincode name');
    res.json({ success: true, data: areas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// SPA Routes
app.get('/result', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'result.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


