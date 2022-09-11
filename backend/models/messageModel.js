const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    text: String,
    createdAt: {
        type: Date, 
        default: new Date()
    },

})

module.exports = mongoose.model('Message', messageSchema);