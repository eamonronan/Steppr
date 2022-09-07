const asyncHandler = require('express-async-handler');
const { rawListeners } = require('../models/conversationModel');
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
        primaryGoalRating: req.body.conversationData.primaryGoalRating,
        secondaryGoalRating: req.body.conversationData.secondaryGoalRating,
    })
    res.status(200).json(conversation);
})

// get user conversations
// GET api/conversations
//private 

const getUserConversations = asyncHandler(async (req, res) => {
    const user = req.user.id;
    if(!req.body) {
        res.status(400)
        throw new Error('Cannot find user!');
    }

    const conversations = await Conversation.find({ user: req.user.id });

    res.status(200).json(conversations);

})

// get user conversations
// GET api/conversations
//private 

const getLastFiveConversations = asyncHandler(async (req, res) => {
    const user = req.user.id;
    if(!req.body) {
        res.status(400)
        throw new Error('Cannot find user!');
    }

    const conversations = await Conversation.find({ user: req.user.id });

    res.status(200).json(conversations.slice(-5));

})

module.exports = {
    createUserConversation,
    getUserConversations,
    getLastFiveConversations
} 