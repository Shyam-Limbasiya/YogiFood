const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const dashboardController = require('../controllers/dashboardController');

router.get('/stats', adminAuth, dashboardController.getStats);
router.get('/revenue', adminAuth, dashboardController.getRevenueStats);
router.get('/occupancy', adminAuth, dashboardController.getOccupancyStats);
router.get('/bookings/daily', adminAuth, dashboardController.getDailyBookings);
router.get('/bookings/monthly', adminAuth, dashboardController.getMonthlyBookings);
router.get('/food-orders/stats', adminAuth, dashboardController.getFoodOrderStats);

module.exports = router;
