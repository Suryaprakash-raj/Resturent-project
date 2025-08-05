import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>About Us</h5>
            <p>
              We deliver delicious, authentic cuisine with fresh ingredients and a commitment to quality.
            </p>
            <div className="d-flex mt-3">
              <a href="https://facebook.com" className="text-white me-3">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" className="text-white me-3">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" className="text-white">
                <FaTwitter size={24} />
              </a>
            </div>
          </Col>

          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">Home</a>
              </li>
              <li>
                <a href="/about" className="text-white text-decoration-none">About</a>
              </li>
              <li>
                <a href="/menu" className="text-white text-decoration-none">Menu</a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">Contact</a>
              </li>
              <li>
                <a href="/book" className="text-white text-decoration-none">Reservations</a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <FaMapMarkerAlt className="me-2" />
                <span>123 Restaurant St, Food City, FC 12345</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <FaPhone className="me-2" />
                <span>+91 9876543210</span>
              </li>
              <li className="d-flex align-items-center">
                <FaEnvelope className="me-2" />
                <span>contact@restaurant.com</span>
              </li>
            </ul>
          </Col>
        </Row>

        <Row>
          <Col className="text-center pt-3 border-top">
            <p className="mb-0">
              &copy; {year} Restaurant Name. All Rights Reserved.
            </p>
            <small className="text-muted">
              Designed with ❤️ for food lovers.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
