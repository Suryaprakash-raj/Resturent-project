import { useState } from "react";
import { toast } from "react-toastify";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhone, FaClock, FaHeart } from "react-icons/fa";
import "../styles/contact.css";


export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    // Show success toast with heart
    toast.success(
      <span>
        Thank you for your message! <FaHeart className="text-danger ms-1" />
      </span>
    );
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Contact Us</h2>

      {/* Contact Cards (Address, Phone, Hours) */}
      <Row className="mb-4 g-4 justify-content-center">
        <Col md={4}>
          <Card className="h-100 text-center py-3 border-0 shadow-sm">
            <FaMapMarkerAlt className="display-6 text-success mx-auto mb-2" />
            <Card.Title>Our Location</Card.Title>
            <Card.Text>123 Food Street, Perumanallur, Tamil Nadu 641666</Card.Text>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 text-center py-3 border-0 shadow-sm">
            <FaPhone className="display-6 text-primary mx-auto mb-2" />
            <Card.Title>Call Us</Card.Title>
            <Card.Text>+91 1234567890</Card.Text>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 text-center py-3 border-0 shadow-sm">
            <FaClock className="display-6 text-warning mx-auto mb-2" />
            <Card.Title>Opening Hours</Card.Title>
            <Card.Text>10:00 AM – 10:00 PM (Everyday)</Card.Text>
          </Card>
        </Col>
      </Row>

      {/* Google Map */}
      <div className="mb-4 text-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12882.788210858944!2d77.34873323279038!3d11.205499823526461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9059e2b15cc53%3A0xf67c95e477d23056!2sPerumanallur%2C%20Tamil%20Nadu%20641666!5e1!3m2!1sen!2sin!4v1753254594897!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Restaurant Location"
          className="rounded-3 shadow-sm"
        />
      </div>

      {/* Contact Form */}
      <Card className="shadow overflow-hidden animate-fadeInUp">
        <Card.Header className="fs-4 fw-bold bg-light">
          Send us a Message
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Type your message here..."
                required
              />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit" variant="primary" size="lg">
                Send Message
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
