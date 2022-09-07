const express = require('express');
const router = express.Router();
const { createUserConversation, getUserConversations, getLastFiveConversations } = require('../controllers/conversationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createUserConversation);
router.get('/', protect, getUserConversations);
router.get('/lastfive', protect, getLastFiveConversations);

module.exports = router;