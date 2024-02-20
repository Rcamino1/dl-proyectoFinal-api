const db = require("../database/db.js");
const express = require("express");
const productController = require("../controllers/product.controller.js");

const router = express.Router();

// Ruta para crear un nuevo producto
router.post("/", productController.createProduct);

// Ruta para actualizar un producto existente
router.put("/:productId", productController.updateProduct);

// Ruta para eliminar un producto existente
router.delete("/:productId", productController.deleteProduct);

// Ruta para obtener todos los productos
router.get("/", productController.getAllProducts);

// Ruta para obtener un producto por su ID
router.get("/:productId", productController.getProductById);

module.exports = router;
