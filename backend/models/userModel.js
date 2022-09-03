const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, 'Please add a first name']
    }, 
    lastName: {
        type: String, 
        required: [true, 'Please add a last name']
    }, 
    email: {
        type: String, 
        required: [true, 'Please add an email'], 
        unique: true
    }, 
    password: {
        type: String, 
        required: [true, 'Please add a password']
    }, 
    stepGoal: {
        type: Number,
    }, 
    userPrimaryGoal: {
        type: String,
    }, 
    userSecondaryGoal: {
        type: String,
    }
    /*  userRole: {
        type: String,
        required: [true, 'Please select a user type -- either trainer or user.']
    } */
}, {
    timestamp: true
})

module.exports = mongoose.model('User', userSchema);
