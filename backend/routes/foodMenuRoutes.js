const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const foodMenuController = require('../controllers/foodMenuController');

//public routes
router.get('/', foodMenuController.getAllItems);
router.get('/categories', foodMenuController.getCategories);
router.get('/items/:id', foodMenuController.getItemDetails);

// Admin routes
router.post('/', adminAuth, foodMenuController.addMenuItem);
router.put('/:id', adminAuth, foodMenuController.updateMenuItem);
router.delete('/:id', adminAuth, foodMenuController.deleteMenuItem);
router.put('/:id/availability', adminAuth, foodMenuController.toggleAvailability);
router.get('/stock-alerts', adminAuth, foodMenuController.getStockAlerts);

module.exports = router;
