const express = require('express');
const router = express.Router();
const { getTickets, createTicket, addReply } = require('../controllers/supportTicketController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.route('/').get(getTickets).post(createTicket);
router.route('/:id/reply').post(addReply);

module.exports = router;
