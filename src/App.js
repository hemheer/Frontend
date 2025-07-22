import React, { useState } from 'react';
import './App.css';
import './Gallery.css';
import './AboutUs.css';
import './ContactUs.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Gallery from './Gallery';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import DiamondDetails from './DiamondDetails';
import TeamMemberProfile from './TeamMemberProfile';
import AdminUpload from './AdminUpload';

function MenuDropdown({ open, onClose }) {
  const location = useLocation();
  const menuItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact Us' },
    // Add more menu items here as needed
  ];
  if (!open) return null;
  return (
    <div className="navbar-dropdown" onMouseLeave={onClose}>
      <div className="menu-label">Main Menu</div>
      <div className="menu-list">
        {menuItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={`menu-link${location.pathname === item.to ? ' active' : ''}`}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ELogo() {
  return (
    <span className="logo-e-custom" aria-label="E">
      <span className="logo-e-bar"></span>
      <span className="logo-e-bar"></span>
      <span className="logo-e-bar"></span>
    </span>
  );
}

function Logo() {
  return (
    <span className="navbar-logo">VIKRAMDEEP IMPEX</span>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Logo />
          <div className="navbar-menu-container">
            <button className="navbar-menu-btn" onClick={() => setMenuOpen(m => !m)} aria-label="Open menu">
              <span className="navbar-menu-icon">&#9776;</span>
            </button>
            <MenuDropdown open={menuOpen} onClose={() => setMenuOpen(false)} />
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/diamond/:id" element={<DiamondDetails />} />
          <Route path="/team/:name" element={<TeamMemberProfile />} />
          <Route path="/admin/upload" element={<AdminUpload />} />
        </Routes>
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">Vikramdeep Impex</div>
            <div className="footer-links footer-links-col">
              <Link to="/">Gallery</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
            <div className="footer-info">
              &copy; {new Date().getFullYear()} Vikramdeep Impex. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
