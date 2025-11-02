// backend/controllers/courtController.js
const Court = require('../models/Court');

exports.createCourt = async (req, res) => {
  try {
    const court = await Court.create(req.body);
    res.status(201).json(court);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCourts = async (req, res) => {
  try {
    const { sport, minPrice, maxPrice, sortBy, search } = req.query;
    const query = {};
    if (sport) query.sport = sport;
    if (search) query.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) query.pricePerHour = {};
    if (minPrice) query.pricePerHour.$gte = Number(minPrice);
    if (maxPrice) query.pricePerHour.$lte = Number(maxPrice);

    let q = Court.find(query);
    if (sortBy === 'priceAsc') q = q.sort({ pricePerHour: 1 });
    if (sortBy === 'priceDesc') q = q.sort({ pricePerHour: -1 });

    const courts = await q.exec();
    res.json(courts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCourtById = async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) return res.status(404).json({ message: 'Court not found' });
    res.json(court);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.bookCourt = async (req, res) => {
  try {
    const { user, date, startTime, endTime, price } = req.body;
    const court = await Court.findById(req.params.id);
    if (!court) return res.status(404).json({ message: 'Court not found' });

    // Basic overlap check (by date and exact startTime)
    const targetDate = new Date(date).toISOString().slice(0, 10);
    const overlap = court.bookings.some(
      b => b.date.toISOString().slice(0, 10) === targetDate && b.startTime === startTime
    );
    if (overlap) return res.status(400).json({ message: 'Slot already booked' });

    court.bookings.push({ user, date, startTime, endTime, price });
    await court.save();
    res.json({ message: 'Booked successfully', court });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCourt = async (req, res) => {
  try {
    const court = await Court.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(court);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCourt = async (req, res) => {
  try {
    await Court.findByIdAndDelete(req.params.id);
    res.json({ message: 'Court deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
