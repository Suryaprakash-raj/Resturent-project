import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function BookingHistory() {
  const { isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await api.get('/bookings');
        setBookings(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [isAuthenticated]);
const handleCancel = async (bookingId) => {
    try {
      await api.delete(`/bookings/${bookingId}`);
      setBookings(bookings.filter((b) => b._id !== bookingId));
      toast.success('Booking cancelled successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to cancel booking. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="mt-4">
        <Alert variant="info">Please log in to see your booking history.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <Alert variant="info">You have no bookings yet.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Guests</th>
              <th>Special Request</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{new Date(booking.date).toLocaleString()}</td>
                <td>{booking.guests}</td>
                <td>{booking.specialRequest || '-'}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleCancel(booking._id)}
                    size="sm"
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
