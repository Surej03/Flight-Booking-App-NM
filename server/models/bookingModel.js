const db = require('../config/db');

const Booking = {
  create: async (userId, flightId, passengers, totalPrice) => {
    return await db('bookings').insert({
      user_id: userId,
      flight_id: flightId,
      passengers,
      total_price: totalPrice
    });
  },

  getByUserId: async (userId) => {
    return await db('bookings')
      .join('flights', 'bookings.flight_id', '=', 'flights.id')
      .where({ user_id: userId })
      .select(
        'bookings.id as booking_id',
        'flights.flight_name',
        'flights.source',
        'flights.destination',
        'flights.departure_date',
        'bookings.passengers',
        'bookings.total_price'
      );
  },

  cancel: async (bookingId, userId) => {
    return await db('bookings')
      .where({ id: bookingId, user_id: userId })
      .del();
  }
};

module.exports = Booking;
