const express = require('express');
const router = express.Router();
const { createUserConversation, getUserConversations } = require('../controllers/conversationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createUserConversation);
router.get('/', protect, getUserConversations);

module.exports = router;