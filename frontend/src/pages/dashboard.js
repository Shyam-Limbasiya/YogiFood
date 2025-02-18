import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    availableRooms: 0,
    todayCheckIns: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stats'); // Change API URL if needed
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <button 
          className="btn btn-primary" 
          onClick={fetchDashboardStats}
        >
          Refresh Data
        </button>
      </div>
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Total Bookings</div>
            <div className="card-body">
              <h5 className="card-title">{stats.totalBookings}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Available Rooms</div>
            <div className="card-body">
              <h5 className="card-title">{stats.availableRooms}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Today's Check-Ins</div>
            <div className="card-body">
              <h5 className="card-title">{stats.todayCheckIns}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">Revenue</div>
            <div className="card-body">
              <h5 className="card-title">${stats.revenue}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
