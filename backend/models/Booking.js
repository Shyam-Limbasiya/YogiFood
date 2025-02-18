const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  check_in: { type: Date, required: true },
  check_out: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  guests_count: { type: Number, required: true },
  total_amount: { type: mongoose.Decimal128, required: true },
  special_requests: { type: String },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
exports.Booking = Booking;
