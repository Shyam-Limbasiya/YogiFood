const mongoose = require('mongoose');

const adminStatsSchema = new mongoose.Schema({
  totalBookings: { type: Number, default: 0 },
  availableRooms: { type: Number, default: 0 },
  todayCheckIns: { type: Number, default: 0 },
  monthlyRevenue: { type: mongoose.Decimal128, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

const AdminStats = mongoose.model('AdminStats', adminStatsSchema);
exports.AdminStats = AdminStats;
