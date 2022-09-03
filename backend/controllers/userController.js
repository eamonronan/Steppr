const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const { restart } = require('nodemon');

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
    const userExists = await User.findOne({ email });
    if (userExists) {
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
        stepGoal: '',
        userPrimaryGoal: '',
        userSecondaryGoal: '',
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
    const { email, password } = req.body;

    // Checking for user email
    const user = await User.findOne({ email });
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


// update user to add step count goal
// PUT api/users/:id
// private

const updateStepCount = asyncHandler(async (req, res) => {
    let id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
        res.status(400);
        throw new Error('Sorry, user not found!');
    } else {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).json(updatedUser);
    }
})




// update user to add primary and secondary userGoals
// PUT api/users/:id
// private

const updateUserGoals = asyncHandler(async (req, res) => {
    let id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
        res.status(400);
        throw new Error('Sorry, user not found!');
    } else {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).json.apply(updatedUser);
    }
})

// create user conversation
// POST api/users/conversations/:id
// private

const createUserConversation = asyncHandler(async (req, res) => {
    let id = req.params.id;
    const user = await User.findById(id);

    const { feeling, stepCount, primaryGoalRating, secondaryGoalRating } = req.body;

    if (!feeling || !stepCount || !primaryGoalRating || !secondaryGoalRating) {
        res.status(400);
        throw new Error('Sorry, user must input all areas of conversation with Rosa.');
    }

    const conversation = await Conversation.create({
        user, 
        feeling, 
        stepCount,
        primaryGoalRating, 
        secondaryGoalRating
    })

    if (conversation) {
        res.status(201).json({
            message: "conversation added successfully"
        })
    }

})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateStepCount, 
    updateUserGoals, 
    createUserConversation
}