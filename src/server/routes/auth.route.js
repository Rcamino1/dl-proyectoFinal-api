const express = require('express');
const { loginUser } = require('../controllers/auth.controller');

// Usamos Router de express
const router = express.Router();

// Definimos las rutas
router.post('/login', loginUser);

module.exports = router;
