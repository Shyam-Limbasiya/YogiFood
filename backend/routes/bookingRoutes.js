const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

// User routes
router.post('/', auth, bookingController.createBooking);
router.get('/my-bookings', auth, bookingController.getUserBookings);
router.get('/my-bookings/:id', auth, bookingController.getBookingDetails);
router.put('/my-bookings/:id/cancel', auth, bookingController.cancelBooking);

// Admin routes
router.get('/all', adminAuth, bookingController.getAllBookings);
router.put('/:id/status', adminAuth, bookingController.updateBookingStatus);
router.get('/stats', adminAuth, bookingController.getBookingStats);
router.delete('/:id', adminAuth, bookingController.deleteBooking);

module.exports = router;
    