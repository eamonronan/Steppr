const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');

// create message
// POST api/messages
// private

const createMessage = asyncHandler(async (req, res) => {
    const user = req.user.id;
    if(!req.body) {
        res.status(400)
        throw new Error('Must submit information for conversation')
    }

    const message = await Message.create({
        user,
        text: req.body.messageData.text, 
        recipient: req.body.messageData.recipient,
    })
    res.status(200).json(message);
})

// get messages
// GET api/messages
// private

const getUserMessages = asyncHandler(async (req, res) => {
    const recipient = req.user._id; 
    if(!req.body) {
        res.status(400)
        throw new Error('Cannot find user!');
    }

    const messages = await Message.find({ recipient: recipient});

    res.status(200).json(messages);

})

module.exports = {
    createMessage,
    getUserMessages

}