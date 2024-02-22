const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware'); // Falta hacaer esto

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);

router.post('/', authMiddleware, productController.addNewProduct);
router.put('/:productId', authMiddleware, productController.updateProduct);
router.delete('/:productId', authMiddleware, productController.removeProduct);

module.exports = router;
