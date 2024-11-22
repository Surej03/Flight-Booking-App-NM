const Booking = require('../models/bookingModel');
const Flight = require('../models/flightModel');

const createBooking = async (req, res) => {
  const { userId, flightId, passengers } = req.body;

  if (!userId || !flightId || !passengers) {
    return res.status(400).json({ error: 'User ID, flight ID, and passengers are required.' });
  }

  try {
    const flight = await Flight.getFlightById(flightId);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found.' });
    }

    const totalPrice = passengers * flight.price;
    const bookingId = await Booking.create(userId, flightId, passengers, totalPrice);

    return res.status(201).json({ bookingId });
  } catch (error) {
    return res.status(500).json({ error: 'Error creating booking.' });
  }
};

const getBookingHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.getByUserId(userId);
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching booking history.' });
  }
};

const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { userId } = req.body;

  try {
    const result = await Booking.cancel(bookingId, userId);
    if (result) {
      return res.status(200).json({ message: 'Booking canceled successfully.' });
    } else {
      return res.status(404).json({ error: 'Booking not found or unauthorized.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error canceling booking.' });
  }
};

module.exports = { createBooking, getBookingHistory, cancelBooking };
