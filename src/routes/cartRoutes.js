const express = require('express');
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware'); // Falta hacer esto

const router = express.Router();

router.get('/', authMiddleware, cartController.getUserCart);
router.post('/addItem', authMiddleware, cartController.addToCart);
router.put('/updateItem', authMiddleware, cartController.updateCart);
router.delete('/removeItem', authMiddleware, cartController.removeFromCart);
router.get('/total', authMiddleware, cartController.getCartTotal);

module.exports = router;
