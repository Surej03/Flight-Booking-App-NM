const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: String,
  source: String,
  destination: String,
  time: String,
  price: Number,
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;