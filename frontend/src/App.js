  import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './layouts/sidebar';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import Home from './pages/home';
import Dashboard from "./pages/dashboard";
import Rooms from "./pages/rooms";
import Bookings from './pages/bookings';
import FoodMenu from './pages/foodmenu';
import Stock from './pages/stock';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      
    
      <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid p-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/food-menu" element={<FoodMenu />} />
            <Route path="/stock" element={<Stock />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  );
}

export default App;
