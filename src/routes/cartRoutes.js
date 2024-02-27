const express = require('express');
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware'); // Falta hacer esto

const router = express.Router();

router.get('/', authMiddleware, cartController.getUserCart);
router.post('/addItem', authMiddleware, cartController.addToCart);
router.put('/updateItem', authMiddleware, cartController.updateCart); // El item que se updatea debe estar en el body
router.delete('/removeItem', authMiddleware, cartController.removeFromCart); // Lo mismo aquí para el que se elimina
router.get('/total', authMiddleware, cartController.getCartTotal);

module.exports = router;
