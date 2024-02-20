import express from 'express';
import cartController from '../controllers/cart.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authenticateToken, cartController.addItem);
router.put('/:productId', authenticateToken, cartController.updateItemQuantity);
router.get('/', authenticateToken, cartController.getCart);
router.delete('/:productId', authenticateToken, cartController.removeItem);

export default router;