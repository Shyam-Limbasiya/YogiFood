const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/User');

const authController = {
  async register(req, res) {
    try {
      const { email, password, fullName, phone } = req.body;
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const user = await User.create({
        email,
        password,
        fullName,
        phone,
        role: 'guest'
      });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      
      res.status(201).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        }
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      
      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};