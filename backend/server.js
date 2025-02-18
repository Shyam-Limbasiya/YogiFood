const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomsRoutes');
const bookingRoutes = require('./routes/bookingsRoutes');
const statsRoutes = require('./routes/stats');
const menuRoutes = require('./routes/menuRoutes');
const menuOrderRoutes = require('./routes/menuOrdersRoutes'); // Assuming this is the correct path

const app = express();

// Middleware
app.use(express.json());  // To parse incoming JSON requests
app.use(cors());  // Enable CORS for frontend-backend communication

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/menu-orders', menuOrderRoutes);  // Correct route for menu orders
app.use('/auth', authRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Yogi Food Backend is Running!');
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log error details
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
