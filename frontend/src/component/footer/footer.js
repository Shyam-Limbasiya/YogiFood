import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <p>Email: info@hotelmanagement.com</p>
            <p>Phone: +1 234 567 8900</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p>&copy; 2024 Hotel Management. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;