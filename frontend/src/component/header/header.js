import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="text-decoration-none">
            <h1 className="h4 m-0 text-primary">Hotel Management</h1>
          </Link>
          <div>
            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;