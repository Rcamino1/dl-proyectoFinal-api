const express = require("express");
const errors = require("../controllers/errors.controller.js");

const router = express.Router();

// Ruta que maneja todas las solicitudes y responde con el controlador de 'no encontrado'
router.all('*', errors.notFound);

module.exports = router;
