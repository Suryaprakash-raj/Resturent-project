const Booking = require('../models/Booking');

// @route   POST /api/bookings
// @desc    Book a table
// @access  Private
exports.bookTable = async (req, res) => {
  try {
    // Destructure required fields
    const { customerName, email, phone, date, guests, specialRequest } = req.body;
    if (!customerName || !email || !phone || !date || !guests) {
      return res.status(400).json({ 
        error: 'All required fields must be filled: customerName, email, phone, date, guests'
      });
    }

    // Create booking with userId from auth middleware
    const booking = new Booking({
      ...req.body,
      userId: req.userId // Attach userId from auth middleware
    });
    await booking.save();

    res.status(201).json({ msg: 'Table booked', booking });
  } catch (err) {
    // Handle validation and other errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/bookings
// @desc    Get all bookings for logged-in user
// @access  Private
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/bookings/:bookingId
// @desc    Cancel a booking (only own bookings)
// @access  Private
// Backend Controller (Excerpt)
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    // Check booking exists and user owns it
    const booking = await Booking.findOne({ _id: bookingId, userId: req.userId });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found or not authorized.' });
    }
    await Booking.findByIdAndDelete(bookingId);
    res.json({ msg: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

