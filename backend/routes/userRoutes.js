const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', authenticate, userController.logoutUser);


module.exports = router;
