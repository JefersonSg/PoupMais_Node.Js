var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

// helpers
const checkOut = require('../helpers/out').checkOut;

// GET
router.get('/', checkOut, authController.login);
router.get('/logout', authController.logout);

// POST
router.post('/register', checkOut, authController.registerPost);
router.post('/login', checkOut, authController.loginPost);

module.exports = router;
