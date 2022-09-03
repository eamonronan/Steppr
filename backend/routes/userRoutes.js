const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateStepCount, updateUserGoals} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/:id/', updateStepCount);
router.put('/:id', updateUserGoals);



module.exports = router;