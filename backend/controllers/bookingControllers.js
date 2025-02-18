const { Booking, Room } = require('../models');

const bookingController = {
  async createBooking(req, res) {
    try {
      const { room_id, check_in, check_out, guests_count, special_requests } = req.body;
      
      // Check room availability
      const overlappingBooking = await Booking.findOne({
        room_id,
        status: { $ne: 'cancelled' },
        $or: [
          {
            check_in: { $lte: new Date(check_out) },
            check_out: { $gte: new Date(check_in) }
          }
        ]
      });

      if (overlappingBooking) {
        return res.status(400).json({ error: 'Room not available for selected dates' });
      }

      const room = await Room.findById(room_id);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }

      const total_amount = calculateTotalAmount(room.base_price, check_in, check_out);

      const booking = await Booking.create({
        user_id: req.user.id,
        room_id,
        check_in,
        check_out,
        guests_count,
        special_requests,
        total_amount,
        status: 'pending'
      });

      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getUserBookings(req, res) {
    try {
      const bookings = await Booking.find({ user_id: req.user.id })
        .populate('room_id')
        .sort('-created_at');
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};