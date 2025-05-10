require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db.js');
const areaRoutes = require('./areaRoutes');
const path = require('path');

const app = express();

const corsOptions = {
  origin: [
    'https://geo-bharat.vercel.app',
    'http://127.0.0.1:5500', // allow local frontend access
    'http://localhost:5500',
    'http://192.168.109.128:5500' // allow local IP access from other devices
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};


app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ✅ JSON body parser
app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// ✅ Routes
app.use('/api/area', areaRoutes);

// ✅ Debug: Get client IP
app.get('/ip', (req, res) => {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;
  console.log('Client IP:', ip);
  res.send(`Your IP: ${ip}`);
});

// ✅ Test route
app.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// ✅ Serve static files (if any)
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Start server on local IP so other devices can connect
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at http://0.0.0.0:${PORT}`);
});
