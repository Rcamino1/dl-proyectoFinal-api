const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);

router.post(
  '/',
  [authMiddleware, adminMiddleware],
  productController.addNewProduct
);
router.put(
  '/:productId',
  [authMiddleware, adminMiddleware],
  productController.updateProduct
);
router.delete(
  '/:productId',
  [authMiddleware, adminMiddleware],
  productController.removeProduct
);

module.exports = router;
