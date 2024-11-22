const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookingHistory,
  cancelBooking
} = require('../controllers/bookingController');

router.post('/book', createBooking);
router.get('/history/:userId', getBookingHistory);
router.delete('/cancel/:bookingId', cancelBooking);

module.exports = router;