import express from "express";
import * as errors from "../controllers/errors.controller.js";

const router = express.Router();

// Ruta que maneja todas las solicitudes y responde con el controlador de 'no encontrado'
router.all('*', errors.notFound);

export default router;
