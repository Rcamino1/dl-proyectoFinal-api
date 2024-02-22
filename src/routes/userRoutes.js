const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/registro', userController.register);
router.post('/login', userController.login);

router.post('/changePassword', authMiddleware, userController.changePassword);
router.get('/:userId', authMiddleware, userController.getUserById);

module.exports = router;
