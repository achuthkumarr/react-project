const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');
const auth = require('../Middlewares/authMiddleware');
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateUpdatePassword
} = require('../Middlewares/AuthValidation');

// Authentication Routes
router.post('/register', validateRegister,authController.register);
router.post('/login', validateLogin, authController.login);

// Password Management Routes
router.post('/forgot-password', validateForgotPassword, authController.forgotPassword);
router.post('/reset-password/:token', validateResetPassword, authController.resetPassword);

module.exports = router;