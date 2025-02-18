// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const menuController = require('../controllers/menuController');

// User routes
router.post('/order', auth, menuController.createOrder);
router.get('/my-orders', auth, menuController.getUserOrders);
router.get('/my-orders/:id', auth, menuController.getOrderDetails);

// Admin routes
router.get('/orders', adminAuth, menuController.getAllOrders);
router.put('/orders/:id/status', adminAuth, menuController.updateOrderStatus);
router.get('/orders/stats', adminAuth, menuController.getOrderStats);
router.get('/popular-items', adminAuth, menuController.getPopularItems);

module.exports = router;