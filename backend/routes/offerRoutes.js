const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const offerController = require('../controllers/offerController');
const auth = require('../middleware/auth');

// GET /api/offers — Get all public offers
router.get('/', offerController.listOffers);

// POST /api/offers — Add new offer (admin only, with validation)
router.post(
  '/',
  auth(['admin']),
  [
    check('title', 'Title is required').not().isEmpty(),
    check('code', 'Code is required').not().isEmpty(),
    check('discount', 'Discount is required').isNumeric(),
    check('validTill', 'Valid till date is required').not().isEmpty()
  ],
  offerController.createOffer
);

// PUT /api/offers/:id — Update offer (admin only)
router.put('/:id', auth(['admin']), offerController.updateOffer);

// DELETE /api/offers/:id — Deactivate offer (admin only)
router.delete('/:id', auth(['admin']), offerController.deleteOffer);

// POST /api/offers/:offerId/book — Apply offer to booking (auth required)
router.post('/:offerId/book', offerController.bookOffer);

// PUT /api/offers/booking/:bookingOfferId/cancel — Cancel booking offer (auth required)
router.put('/booking/:bookingOfferId/cancel', offerController.cancelBookingOffer);

// DELETE /api/offers/booking/:bookingOfferId — Delete booking offer (admin only)
router.delete('/booking/:bookingOfferId', auth(['admin']), offerController.deleteBookingOffer);

// GET /api/offers/user/:userId/bookings — Get user's booking offers
router.get('/user/:userId/bookings', offerController.getUserBookingOffers);

module.exports = router;
