const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
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
            userPrimaryGoal : user.userPrimaryGoal,
            userSecondaryGoal : user.userSecondaryGoal,
            userStepCount: user.stepGoal
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

// check if user is Admin
const isAdmin = asyncHandler(async (req, res) => {
    let id = req.params.id;
    const user = await User.findById(id);

    if (user.role === "admin") {
        return true;
    } else {
        return false;
    }

})


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

// get userPrimaryGoal

const getPrimaryGoal = asyncHandler(async (req, res) => {
    let id = req.params.id;
    const user = await User.findById(id);

    let userPrimaryGoal;

    if (!user) {
        res.status(400);
        throw new Error('Sorry, user not found!');
    } else {
        userPrimaryGoal = user.userPrimaryGoal;
    }
    
    res.status(200).json(userPrimaryGoal);
})

// get userSecondaryGoal

const getSecondaryGoal = asyncHandler(async (req, res) => {
    let id = req.params.id;
    const user = await User.findById(id);

    let userSecondaryGoal;

    if (!user) {
        res.status(400);
        throw new Error('Sorry, user not found!');
    } else {
        userSecondaryGoal = user.userSecondaryGoal;
    }
    
    res.status(200).json(userSecondaryGoal);
})

// get userStepCount

const getStepCount = asyncHandler(async (req, res) => {
    let id = req.params.id;
    const user = await User.findById(id);

    let userStepCount;

    if (!user) {
        res.status(400);
        throw new Error('Sorry, user not found!');
    } else {
        userStepCount = user.stepGoal;
    }
    
    res.status(200).json(userStepCount);
})

const getAllUsers = asyncHandler(async (req, res) => {

    User.find({}, (err, users) => {
        var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        })
    
        res.send(userMap);  
      });
})


module.exports = {
    isAdmin,
    registerUser,
    loginUser,
    getMe,
    updateStepCount, 
    updateUserGoals, 
    getPrimaryGoal, 
    getSecondaryGoal, 
    getStepCount, 
    getAllUsers
}