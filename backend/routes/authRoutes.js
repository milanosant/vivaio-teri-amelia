const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Definizione delle rotte pubbliche (non serve il token per registrarsi o loggarsi)
// Rotta: POST /api/auth/register
router.post('/register', authController.register);

// Rotta: POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;