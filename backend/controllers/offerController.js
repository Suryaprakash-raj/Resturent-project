const Offer = require('../models/Offer');
const BookingOffer = require('../models/BookingOffer');
const Booking = require('../models/Booking');

const listOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching offers' });
  }
};

const createOffer = async (req, res) => {
  const { title, description, code, discount, validTill, maxUsage } = req.body;
  try {
    const newOffer = new Offer({ title, description, code, discount, validTill, maxUsage });
    const offer = await newOffer.save();
    res.status(201).json(offer);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'Promo code already exists!' });
    } else {
      res.status(500).json({ message: 'Failed to create offer' });
    }
  }
};

const updateOffer = async (req, res) => {
  const { id } = req.params;
  const { title, description, code, discount, validTill, maxUsage } = req.body;
  try {
    const offer = await Offer.findByIdAndUpdate(
      id,
      { title, description, code, discount, validTill, maxUsage },
      { new: true }
    );
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json(offer);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'Promo code already exists!' });
    } else {
      res.status(500).json({ message: 'Failed to update offer' });
    }
  }
};

const deleteOffer = async (req, res) => {
  const { id } = req.params;
  try {
    const offer = await Offer.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer deactivated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to deactivate offer' });
  }
};

const bookOffer = async (req, res) => {
  try {
    const { userId, bookingId } = req.body;
    const offer = await Offer.findById(req.params.offerId);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    if (!offer.isActive || new Date(offer.validTill) < new Date())
      return res.status(400).json({ message: 'Offer not available' });
    // Optional: Prevent double-booking
    const existing = await BookingOffer.findOne({ offerId: offer._id, userId, status: 'booked' });
    if (existing) return res.status(400).json({ message: 'This offer has already been booked by you!' });
    const bookingOffer = new BookingOffer({ offerId: offer._id, userId, bookingId, status: 'booked' });
    await bookingOffer.save();
    res.status(201).json(bookingOffer);
  } catch (err) {
    res.status(500).json({ message: 'Failed to book offer' });
  }
};

const cancelBookingOffer = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const bookingOffer = await BookingOffer.findByIdAndUpdate(
      req.params.bookingOfferId,
      { status: 'cancelled' },
      { new: true }
    );
    if (!bookingOffer) return res.status(404).json({ message: 'Booking offer not found' });
    await Booking.findByIdAndUpdate(bookingId, { status: 'cancelled' });
    res.json(bookingOffer);
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel booking offer' });
  }
};

const deleteBookingOffer = async (req, res) => {
  try {
    const bookingOffer = await BookingOffer.findByIdAndDelete(req.params.bookingOfferId);
    if (!bookingOffer) return res.status(404).json({ message: 'Booking offer not found' });
    res.json({ message: 'Booking offer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete booking offer' });
  }
};

const getUserBookingOffers = async (req, res) => {
  try {
    const bookings = await BookingOffer.find({
      userId: req.params.userId,
      status: { $nin: ['expired', 'cancelled'] }
    }).populate('offerId', 'title code discount').populate('bookingId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching your offers' });
  }
};

module.exports = {
  listOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  bookOffer,
  cancelBookingOffer,
  deleteBookingOffer,
  getUserBookingOffers,
};
