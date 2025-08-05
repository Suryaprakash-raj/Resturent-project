import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'react-bootstrap';
import {
  FaUser,
  FaHome,
  FaUtensils,
  FaInfoCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaTags,
  FaHistory,
  FaTimes,
  FaSignOutAlt,
  FaSignInAlt,
} from 'react-icons/fa';
import '../styles/navbar.css';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Logout handler
  const handleLogout = () => {
    logout(navigate);
  };

  // Scroll listener for implementing scrolled styles
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-dark mb-4 ${
          scrolled ? 'navbar-scroll' : ''
        }`}
        style={{
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1100,
        }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src="/images/logo1.png"
              alt="Restaurant Logo"
              style={{ height: '40px', objectFit: 'contain' }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Mobile menu close button */}
            <Button
              className="d-lg-none btn-close-white position-absolute end-0 me-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-label="Close"
              style={{
                border: 'none',
                background: 'transparent',
                color: 'white',
                fontSize: '1.5rem',
                lineHeight: '1.5rem',
                padding: '0.25rem 0.75rem',
              }}
            >
              <FaTimes />
            </Button>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FaHome /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  <FaInfoCircle /> About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu">
                  <FaUtensils /> Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/offers">
                  <FaTags /> Offers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/events">
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <FaEnvelope /> Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/book">
                  <FaCalendarAlt /> Book Table
                </Link>
              </li>
              {isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/booking-history">
                    <FaHistory /> My Bookings
                  </Link>
                </li>
              )}
            </ul>
            <div className="d-flex">
              {isAuthenticated ? (
                <>
                  <Link className="btn btn-outline-light me-2" to="/profile">
                    <FaUser /> {user.name}
                  </Link>
                  <Button variant="outline-light" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link className="btn btn-outline-light me-2" to="/login">
                    <FaSignInAlt /> Login
                  </Link>
                  <Link className="btn btn-outline-light" to="/register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Padding top to avoid content behind fixed navbar */}
      {/* To be set globally: body { padding-top: 70px; } (adjust height if needed) */}
    </>
  );
}
