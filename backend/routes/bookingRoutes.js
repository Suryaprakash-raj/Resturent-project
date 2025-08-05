const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// @route   POST /api/bookings
// @desc    Book a table (customer only)
router.post(
  '/',
  auth(['customer']),
  [
    check('customerName', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
    check('guests', 'Number of guests is required').isNumeric(),
  ],
  bookingController.bookTable
);

// @route   GET /api/bookings
// @desc    Get user bookings (customer only)
router.get('/', auth(['customer']), bookingController.getUserBookings);

// @route   DELETE /api/bookings/:bookingId
// @desc    Cancel a booking (customer only)
router.delete('/:bookingId', auth(['customer']), bookingController.cancelBooking);

module.exports = router;
