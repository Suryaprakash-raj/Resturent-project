// models/Offer.js
import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true, min: 1, max: 100 },
  validTill: { type: Date, required: true },
  maxUsage: { type: Number, default: Infinity },   // Optional: max times offer can be used
  isActive: { type: Boolean, default: true },      // Admin can deactivate offers
}, { timestamps: true });

export default mongoose.model('Offer', offerSchema);
