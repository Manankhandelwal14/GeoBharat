// server.js 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db.js'); // Using your existing database connection

const app = express();
// Add this route to your server.js to check what's in your database
app.get('/debug/areas', async (req, res) => {
  try {
    const Area = require('./models/Area');
    const allAreas = await Area.find();
    res.json({
      count: allAreas.length,
      areas: allAreas
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies

// Connect to database
connectDB();

// Import routes
const areaRoutes = require('./areaRoutes'); // Import your area routes

// Mount routes
app.use('/api/area', areaRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});


app.use(express.static('public'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
