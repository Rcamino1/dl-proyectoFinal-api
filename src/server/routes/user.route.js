const express = require("express");
const userController = require("../controllers/user.controller.js");
const { authenticateToken, isAdmin } = require("../middlewares/auth.middleware.js");

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post("/", userController.createUser);

// Ruta para obtener todos los usuarios (requiere autenticación y rol de administrador)
router.get("/", authenticateToken, isAdmin, userController.getAllUsers);

// Ruta para obtener un usuario por su ID (requiere autenticación)
router.get("/:id", authenticateToken, userController.getUserById);

// Ruta para actualizar un usuario por su ID (requiere autenticación y rol de administrador)
router.put("/:id", authenticateToken, isAdmin, userController.updateUser);

// Ruta para eliminar un usuario por su ID (requiere autenticación y rol de administrador)
router.delete("/:id", authenticateToken, isAdmin, userController.deleteUser);

module.exports = router;
