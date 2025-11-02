// backend/models/Court.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const CourtSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String },
  images: [{ type: String }],
  pricePerHour: { type: Number, default: 200 },
  facilities: [{ type: String }],
  equipmentRental: { type: Boolean, default: false },
  proCoaching: { type: Boolean, default: false },
  cafeLounge: { type: Boolean, default: false },
  bookings: [BookingSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Court', CourtSchema);
