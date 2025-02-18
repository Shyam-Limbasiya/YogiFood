const adminController = {
    async getDashboardStats(req, res) {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const [totalBookings, availableRooms, todayCheckIns, revenueStats] = await Promise.all([
          Booking.countDocuments(),
          Room.countDocuments({ is_active: true }),
          Booking.countDocuments({
            check_in: { $gte: today, $lt: tomorrow },
            status: 'confirmed'
          }),
          Booking.aggregate([
            {
              $match: {
                status: 'confirmed',
                created_at: {
                  $gte: new Date(new Date().setDate(new Date().getDate() - 30))
                }
              }
            },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$total_amount" }
              }
            }
          ])
        ]);
  
        res.json({
          totalBookings,
          availableRooms,
          todayCheckIns,
          monthlyRevenue: revenueStats[0]?.totalRevenue || 0
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    async getAllBookings(req, res) {
      try {
        const bookings = await Booking.find()
          .populate('user_id', 'fullName email')
          .populate('room_id')
          .sort('-created_at');
        res.json(bookings);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  };
  