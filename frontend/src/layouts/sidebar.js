import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { List, X } from "lucide-react"; // Import Lucide icons
import '../style/sidebar.css'; // Correct the relative path
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state

  return (
    <>
      {/* Header - Brand & Hamburger Icon */}
      <div className="d-flex align-items-center justify-content-between p-3 bg-light shadow" style={{ width: "100%" }}>
        {/* Brand Name */}
        <Link to="/" className="navbar-brand ms-3">
          <h2>Yogi Food</h2>
        </Link>

        {/* Hamburger Button */}
        <button
          className="btn btn-light me-3 shadow"
          onClick={() => setIsOpen(!isOpen)}
          style={{ zIndex: 1050 }}
        >
          {isOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`d-flex flex-column bg-light position-fixed top-0 start-0 vh-100 p-3 shadow ${
          isOpen ? "translate-x-0" : "d-none"
        }`}
        style={{ width: "250px", zIndex: 1040, marginTop: "60px" }} // Added margin to push below header
      >
        {/* Navigation Links */}
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link" activeClassName="active">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/bookings" className="nav-link" activeClassName="active">
              Bookings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/rooms" className="nav-link" activeClassName="active">
              Rooms
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/food-menu" className="nav-link" activeClassName="active">
              Food Menu
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/stock" className="nav-link" activeClassName="active">
              Stock
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
