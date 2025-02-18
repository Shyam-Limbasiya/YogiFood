const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      food_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodMenu' },
      name: { type: String },
      quantity: { type: Number, required: true },
      price: { type: mongoose.Decimal128, required: true },
    }
  ],
  total_amount: { type: mongoose.Decimal128, required: true },
  payment_status: { type: String, enum: ['pending', 'paid'], required: true },
  status: { type: String, enum: ['preparing', 'delivered', 'cancelled'], default: 'preparing' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
exports.Order = Order;
