// backend/models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  date: { type: Date, required: true },
  location: { type: String },
  seatsTotal: { type: Number, default: 100 },
  seatsLeft: { type: Number, default: 100 },
  price: { type: Number, default: 0 },
  status: { type: String, enum: ['upcoming', 'ongoing', 'featured', 'past'], default: 'upcoming' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);
