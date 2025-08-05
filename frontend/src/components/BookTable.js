import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { Form, Button, Container, Spinner, Alert } from 'react-bootstrap';
import "../styles/book.css";


export default function BookTable() {
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    date: '',
    guests: 1,
    specialRequest: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Set user's name and email if logged in
  useEffect(() => {
    if (isAuthenticated && user?.name && user?.email) {
      setFormData(prev => ({
        ...prev,
        customerName: user.name,
        email: user.email,
        phone: user.phone || '', // Optional: fill phone if available
      }));
    }
  }, [isAuthenticated, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Client-side validation for required fields
    if (
      !formData.customerName ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.guests
    ) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      // Prepare date as ISO string for your backend Date field (MongoDB)
      const bookingData = {
        ...formData,
        date: new Date(formData.date).toISOString(),
      };

      await api.post('/bookings', bookingData);

      // Show success toast and reset form
      toast.success('Table booked successfully!');
      setFormData({
        customerName: isAuthenticated && user?.name ? user.name : '',
        email: isAuthenticated && user?.email ? user.email : '',
        phone: isAuthenticated && user?.phone ? user.phone : '',
        date: '',
        guests: 1,
        specialRequest: '',
      });
    } catch (err) {
      // Show error toast and error message in form
      setError(err.response?.data?.error || err.message || 'Booking failed. Please try again.');
      toast.error('your not login only login user book the table');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Book a Table</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date & Time</Form.Label>
          <Form.Control
            type="datetime-local"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Guests</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: +e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Special Request (Optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.specialRequest}
            onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
          />
        </Form.Group>
        <Button type="submit" disabled={loading}>
          {loading ? <span>Booking... <Spinner size="sm" animation="border" /></span> : 'Book Now'}
        </Button>
      </Form>
    </Container>
  );
}
