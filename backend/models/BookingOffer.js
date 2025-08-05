// models/BookingOffer.js
import mongoose from 'mongoose';

const bookingOfferSchema = new mongoose.Schema({
  offerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  appliedAt: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['booked', 'cancelled', 'redeemed', 'expired'],
    default: 'booked' 
  },
}, { timestamps: true });

export default mongoose.model('BookingOffer', bookingOfferSchema);
