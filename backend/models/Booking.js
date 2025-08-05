const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  guests: { type: Number, required: true },
  specialRequest: { type: String }
}, { timestamps: true });


module.exports = mongoose.model('Booking', BookingSchema);
