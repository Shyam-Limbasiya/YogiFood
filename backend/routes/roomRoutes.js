// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const roomController = require('../controllers/roomController');

// User routes
router.get('/', roomController.getAllRooms);
router.get('/available', roomController.getAvailableRooms);
router.get('/types', roomController.getRoomTypes);
router.get('/:id', roomController.getRoomDetails);
router.get('/:id/availability', roomController.checkRoomAvailability);

// Admin routes
router.post('/', adminAuth, roomController.createRoom);
router.put('/:id', adminAuth, roomController.updateRoom);
router.delete('/:id', adminAuth, roomController.deleteRoom);
router.put('/:id/status', adminAuth, roomController.toggleRoomStatus);
router.get('/maintenance/status', adminAuth, roomController.getMaintenanceStatus);
router.post('/:id/maintenance', adminAuth, roomController.setRoomMaintenance);