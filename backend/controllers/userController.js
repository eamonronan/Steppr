const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @description     register new user
//@route            POST /api/users
//@access           public

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields when registering');
    }

    // Check if user is already registered
    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating the user
    const user = await User.create({
        firstName, 
        lastName, 
        email, 
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id, 
            name: user.firstName, 
            email: user.email, 
            token: generateToken(user._id), 
            //userRole: user.userRole,
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// @description     authenticate user
//@route            POST /api/users/login
//@access           public

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // Checking for user email
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id, 
            name: user.firstName, 
            email: user.email,
            token: generateToken(user._id), 
            //userRole: user.userRole,
        })
    } else {
        res.status(400);
        throw new Error('Sorry, invalid user credentials.');
    }
})


// @description     get user data
//@route            GET /api/users/me
//@access           private

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
})

// make JSON Web Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '14d',
    })
}

// set user step count goal
//const setStepGoal =  

module.exports = {
    registerUser,
    loginUser, 
    getMe
}