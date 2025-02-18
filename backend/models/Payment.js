const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: mongoose.Decimal128, required: true },
  payment_method: { type: String, enum: ['credit_card', 'debit_card', 'paypal', 'upi'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
  transaction_id: { type: String, required: true, unique: true },
  payment_date: { type: Date, default: Date.now },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
exports.Payment = Payment;
