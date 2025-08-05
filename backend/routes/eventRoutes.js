const router = require('express').Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// @route   GET /api/events
// @desc    Get all events
router.get('/', eventController.getEvents); // No auth!


// @route   POST /api/events
// @desc    Add new event (admin)
router.post('/', auth(['admin']), [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('eventDate', 'Event date is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty(),
  check('seatsLeft', 'Seats left is required').isNumeric()
], eventController.addEvent);

module.exports = router;
