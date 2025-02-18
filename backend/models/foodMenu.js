const mongoose = require('mongoose');

const foodMenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['starter', 'main_course', 'dessert', 'beverages'], required: true },
  price: { type: mongoose.Decimal128, required: true },
  image: { type: String },
  availability: { type: Boolean, default: true },
}, { timestamps: true });

const FoodMenu = mongoose.model('FoodMenu', foodMenuSchema);
exports.FoodMenu = FoodMenu;
