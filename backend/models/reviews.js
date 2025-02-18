const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: false },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: false },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  review_date: { type: Date, default: Date.now },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
exports.Review = Review;
