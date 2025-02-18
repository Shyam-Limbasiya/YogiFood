const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  room_number: { type: String, required: true, unique: true },
  room_type: { type: String, enum: ['single', 'double', 'suite'], required: true },
  base_price: { type: mongoose.Decimal128, required: true },
  capacity: { type: Number, required: true },
  floor: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  amenities: [{ type: String }],  // Changed to an array for flexibility
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
exports.Room = Room;
