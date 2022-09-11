const express = require('express');
const router = express.Router();
const { createMessage, getUserMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createMessage);
router.get('/', protect, getUserMessages)

module.exports = router;
