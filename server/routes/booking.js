const express = require('express');
const router = express.Router();

const booking = require('../controllers/booking')

router.post('/', booking.createBooking);
router.get('/', booking.consultBookings)
router.get('/:id', booking.consultBooking)
router.put('/:id', booking.updateBooking)
router.delete('/:id', booking.deleteBooking)

module.exports = router;