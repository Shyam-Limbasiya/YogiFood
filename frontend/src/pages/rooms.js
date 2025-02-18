// src/pages/rooms.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    type: 'standard',
    price: '',
    status: 'available'
  });
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/api/rooms');
      setRooms(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingRoom) {
        await axios.put(`/api/rooms/${editingRoom._id}`, formData);
      } else {
        await axios.post('/api/rooms', formData);
      }
      fetchRooms();
      setFormData({
        roomNumber: '',
        type: 'standard',
        price: '',
        status: 'available'
      });
      setEditingRoom(null);
    } catch (err) {
      setError('Failed to save room');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      roomNumber: room.roomNumber,
      type: room.type,
      price: room.price,
      status: room.status
    });
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    
    setLoading(true);
    try {
      await axios.delete(`/api/rooms/${roomId}`);
      fetchRooms();
    } catch (err) {
      setError('Failed to delete room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Room Number"
              value={formData.roomNumber}
              onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
              required
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              required
            >
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Price per night"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
          </div>
          <div className="col-md-3">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (editingRoom ? 'Update Room' : 'Add Room')}
            </button>
            {editingRoom && (
              <button 
                type="button" 
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setEditingRoom(null);
                  setFormData({
                    roomNumber: '',
                    type: 'standard',
                    price: '',
                    status: 'available'
                  });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room._id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.type}</td>
                  <td>${room.price}</td>
                  <td>
                    <span className={`badge ${
                      room.status === 'available' ? 'bg-success' : 'bg-danger'
                    }`}>
                      {room.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(room)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(room._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Rooms;