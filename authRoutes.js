// routes/authRoutes.js
const express = require('express');
const { signup, signin } = require('../controllers/authController');
const router = express.Router();

// Sign up route
router.post('/signup', signup);

// Sign in route
router.post('/signin', signin);

module.exports = router;
