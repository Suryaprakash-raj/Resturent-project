const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: Date, required: true },
  image: { type: String },
  location: { type: String },
  seatsLeft: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
