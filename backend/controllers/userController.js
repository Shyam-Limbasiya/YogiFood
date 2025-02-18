const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const FoodOrder = require('../models/FoodOrder');
const Review = require('../models/Review');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
  // Authentication
  async register(req, res) {
    try {
      const { email, password, fullName, phone } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await User.create({
        email,
        password: hashedPassword,
        fullName,
        phone,
        role: 'user'
      });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(201).json({ token, user: { id: user._id, email, fullName } });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ token, user: { id: user._id, email, fullName: user.fullName } });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  // Room related
  async getRooms(req, res) {
    try {
      const { type, minPrice, maxPrice, checkIn, checkOut } = req.query;
      const filter = {};

      if (type) filter.roomType = type;
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }

      // Check availability for given dates
      if (checkIn && checkOut) {
        const unavailableRoomIds = await Booking.distinct('roomId', {
          $or: [
            {
              checkIn: { $lte: new Date(checkOut) },
              checkOut: { $gte: new Date(checkIn) }
            }
          ]
        });
        filter._id = { $nin: unavailableRoomIds };
      }

      const rooms = await Room.find(filter);
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Booking related
  async createBooking(req, res) {
    try {
      const { roomId, checkIn, checkOut, guests } = req.body;
      const userId = req.user.id;

      // Check room availability
      const isAvailable = await Room.isAvailable(roomId, checkIn, checkOut);
      if (!isAvailable) {
        throw new Error('Room not available for selected dates');
      }

      const booking = await Booking.create({
        userId,
        roomId,
        checkIn,
        checkOut,
        guests,
        status: 'confirmed'
      });

      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = userController;    