const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const menuOrderController = require('../controllers/menuOrderController');

// User routes
router.post('/order', auth, menuOrderController.createOrder);
router.get('/my-orders', auth, menuOrderController.getUserOrders);
router.get('/my-orders/:id', auth, menuOrderController.getOrderDetails);
router.put('/my-orders/:id/cancel', auth, menuOrderController.cancelOrder);

// Admin routes
router.get('/orders', adminAuth, menuOrderController.getAllOrders);
router.put('/orders/:id/status', adminAuth, menuOrderController.updateOrderStatus);
router.get('/orders/stats', adminAuth, menuOrderController.getOrderStats);
router.put('/orders/:id/assign', adminAuth, menuOrderController.assignOrder);

module.exports = router;