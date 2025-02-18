import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // Filter for room types

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/api/rooms');
      setRooms(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch rooms');
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter(room => 
    filter === 'all' ? true : room.type === filter
  );

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="mb-4">
        <select 
          className="form-select" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Rooms</option>
          <option value="standard">Standard</option>
          <option value="deluxe">Deluxe</option>
          <option value="suite">Suite</option>
        </select>
      </div>

      <div className="row">
        {filteredRooms.map(room => (
          <div key={room._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Room {room.roomNumber}</h5>
                <p className="card-text">Type: {room.type}</p>
                <p className="card-text">Price: ${room.price}/night</p>
                <p className="card-text">
                  Status: 
                  <span className={`badge ${
                    room.status === 'available' ? 'bg-success' : 'bg-danger'
                  } ms-2`}>
                    {room.status}
                  </span>
                </p>
                {room.status === 'available' && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.location.href = `/booking/${room._id}`}
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;