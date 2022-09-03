const asyncHandler = require('express-async-handler');
const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');

// create user conversation
// POST api/conversations/
// private

const createUserConversation = asyncHandler(async (req, res) => {
    const user = req.user.id;
    if(!req.body) {
        res.status(400)
        throw new Error('Must submit information for conversation')
    }

    const conversation = await Conversation.create({
        user,
        feeling: req.body.conversationData.feeling,
        stepCount: req.body.conversationData.stepCount,
        primaryGoalRating: req.body.conversationData.stepCount,
        secondaryGoalRating: req.body.conversationData.secondaryGoalRating,
    })
    res.status(200).json(conversation);
})

module.exports = {
    createUserConversation,
} 