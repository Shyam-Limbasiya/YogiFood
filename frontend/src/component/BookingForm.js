import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BookingForm = ({ room }) => {
  const { user } = useAuth();
  const [booking, setBooking] = useState({
    checkIn: '',
    checkOut: '',
    guestsCount: 1,
    specialRequests: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Calculate minimum check-in date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate minimum check-out date (day after check-in)
  const minCheckOut = booking.checkIn 
    ? new Date(new Date(booking.checkIn).getTime() + 86400000).toISOString().split('T')[0]
    : today;

  // Calculate total price based on number of nights
  const calculateTotalPrice = () => {
    if (booking.checkIn && booking.checkOut) {
      const startDate = new Date(booking.checkIn);
      const endDate = new Date(booking.checkOut);
      const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      return nights * room.basePrice;
    }
    return 0;
  };

  const validateDates = () => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    return checkOut > checkIn;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate inputs
    if (!booking.checkIn || !booking.checkOut) {
      setError('Please select both check-in and check-out dates');
      setLoading(false);
      return;
    }

    if (!validateDates()) {
      setError('Check-out date must be after check-in date');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/bookings', {
        ...booking,
        room: room._id,
        totalAmount: calculateTotalPrice(),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setSuccess(true);
      // Reset form
      setBooking({
        checkIn: '',
        checkOut: '',
        guestsCount: 1,
        specialRequests: '',
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          Booking successfully created!
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Check-in Date
          </label>
          <input
            type="date"
            value={booking.checkIn}
            min={today}
            onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Check-out Date
          </label>
          <input
            type="date"
            value={booking.checkOut}
            min={minCheckOut}
            onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Guests
          </label>
          <input
            type="number"
            value={booking.guestsCount}
            onChange={(e) => setBooking({ 
              ...booking, 
              guestsCount: parseInt(e.target.value) 
            })}
            className="w-full border rounded p-2"
            min="1"
            max={room.capacity}
            required
          />
          <p className="text-sm text-gray-500">
            Maximum capacity: {room.capacity} guests
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Special Requests
          </label>
          <textarea
            value={booking.specialRequests}
            onChange={(e) => setBooking({ 
              ...booking, 
              specialRequests: e.target.value 
            })}
            className="w-full border rounded p-2"
            rows="3"
            placeholder="Any special requests?"
          />
        </div>

        {booking.checkIn && booking.checkOut && (
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium">Booking Summary</h3>
            <p>Total Price: ${calculateTotalPrice()}</p>
            <p>Number of Nights: {
              Math.ceil(
                (new Date(booking.checkOut) - new Date(booking.checkIn)) / 
                (1000 * 60 * 60 * 24)
              )
            }</p>
          </div>
        )}

        <button 
          type="submit" 
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white 
            ${loading 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;