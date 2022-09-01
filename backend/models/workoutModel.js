const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    text: String, 
    /* message: String, 
    creator: String, 
    tags: [String], 
    likeCount: {
        type: Number, 
        default: 0
    },
     */
    selectedFile: String, 
    createdAt: {
        type: Date, 
        default: new Date()
    },
    
})

module.exports = mongoose.model('Workout', workoutSchema);