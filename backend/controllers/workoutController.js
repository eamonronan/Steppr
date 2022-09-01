const asyncHandler = require('express-async-handler');

const Workout = require('../models/workoutModel');
const User = require('../models/userModel');

// get workouts
// GET api/workouts
// private
const getWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workout.find({ user: req.user.id });
    res.status(200).json(workouts);
})

// set workout
// POST api/workouts
// private
const setWorkout = asyncHandler(async (req, res) => {

    if(!req.body) {
        res.status(400)
        throw new Error('Please add a text field');
    }
    const workout = await Workout.create({
        text: req.body.workoutData.text,
        user: req.user.id,
        selectedFile: req.body.workoutData.selectedFile,
    })
    res.status(200).json(workout);
})

// update workout
// PUT api/workouts/:id
// private
const updateWorkout = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id);
    if(!workout) {
        res.status(400);
        throw new Error('Workout not found');
    }

    if(!req.user) {
        res.status(401);
        throw new Error('Sorry, user not found.');
    }


    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized.');
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedWorkout);
})

// delete workout
// GET api/workouts/:id
// private
const deleteWorkout = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id);
    if(!workout) {
        res.status(400);
        throw new Error('Workout not found');
    }

    if(!req.user) {
        res.status(401);
        throw new Error('Sorry, user not found.');
    }


    if (workout.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized.');
    }

    await workout.remove();
    res.status(200).json({ id: req.params.id });
})

module.exports = { 
    getWorkouts,
    setWorkout,
    updateWorkout,
    deleteWorkout
}