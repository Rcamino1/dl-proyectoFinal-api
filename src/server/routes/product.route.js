// productRouter.js
const db = require("../database/db");
const express = require("express");
const productController = require("../controllers/product.controller");

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);
// Definir rutas para crear, actualizar y eliminar productos

module.exports = router;
