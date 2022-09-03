const express = require('express');
const router = express.Router();
const { createUserConversation } = require('../controllers/conversationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createUserConversation);

module.exports = router;