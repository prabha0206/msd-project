// backend/models/Membership.js
const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  price: { type: Number, required: true },
  durationMonths: { type: Number, default: 1 },
  benefits: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Membership', MembershipSchema);
