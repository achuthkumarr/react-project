const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
const auth = require('../Middlewares/authMiddleware');

// User Profile Routes
router.get('/profile', auth, userController.getProfile);
router.put('/update', auth, userController.updateProfile);
router.post('/update-password', auth, userController.changePassword);

module.exports = router;