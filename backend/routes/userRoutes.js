const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateStepCount, updateUserGoals, getPrimaryGoal, getSecondaryGoal, getStepCount, getAllUsers, registerTrainer, loginTrainer} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/authMiddleware');


router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/:id/', updateStepCount);
router.put('/:id', updateUserGoals);

router.get('/primarygoal/:id', protect, getPrimaryGoal);
router.get('/secondarygoal/:id', getSecondaryGoal);
router.get('/stepcount/:id', getStepCount);

router.get('/getusers', getAllUsers);
router.post('/trainer', registerTrainer);
router.post('/trainerlogin', loginTrainer);


module.exports = router;