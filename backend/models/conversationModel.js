const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    feeling: String,
    stepCount: Number,
    primaryGoalRating: Number, 
    secondaryGoalRating: Number, 
    createdAt: {
        type: Date, 
        default: new Date()
    },

})

module.exports = mongoose.model('Conversation', conversationSchema);