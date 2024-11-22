const Flight = require('../models/flightModel');

const searchFlights = async (req, res) => {
  const { source, destination, date } = req.query;

  if (!source || !destination || !date) {
    return res.status(400).json({ error: 'Source, destination, and date are required.' });
  }

  try {
    const flights = await Flight.search(source, destination, date);
    return res.status(200).json(flights);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching flights.' });
  }
};

module.exports = { searchFlights };