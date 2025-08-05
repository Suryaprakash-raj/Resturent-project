import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { Card, ListGroup, Form, Button, Container } from 'react-bootstrap';

export default function ProfileDashboard() {
  const { user, token, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    avatar: user?.avatar || ''
  });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, avatar: user.avatar });
      api.get('/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setBookings(res.data));
    }
  }, [user, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put('/user', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUser(res.data);
        toast.success('Profile updated');
      })
      .catch(() => toast.error('Failed to update profile'));
  };

  return user ? (
    <Container className="mt-4">
      <h2>My Profile</h2>
      <Card>
        <Card.Body>
          <h4>{user.name}</h4>
          <p>Email: {user.email}</p>
        </Card.Body>
      </Card>
      <hr />
      <h4>My Bookings</h4>
      {bookings.length > 0 ? (
        <ListGroup>
          {bookings.map((booking) => (
            <ListGroup.Item key={booking._id}>
              <span>{new Date(booking.date).toLocaleString()}</span> | <span>{booking.guests} guests</span>
              {booking.specialRequest && <p>Request: {booking.specialRequest}</p>}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No bookings yet.</p>
      )}
      <hr />
      <h4>Edit Profile</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Avatar (image URL)</Form.Label>
          <Form.Control
            type="text"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          />
        </Form.Group>
        <Button type="submit">Update Profile</Button>
      </Form>
    </Container>
  ) : (
    <div className="alert alert-danger mt-4">Please login to view your profile.</div>
  
  );
}
