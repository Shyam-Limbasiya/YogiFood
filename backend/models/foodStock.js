const mongoose = require('mongoose');

const foodStockSchema = new mongoose.Schema({
  food_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodMenu', required: true },
  quantity: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

const FoodStock = mongoose.model('FoodStock', foodStockSchema);
exports.FoodStock = FoodStock;
