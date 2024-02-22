const cartService = require('../services/cartService');

const getUserCart = async (req, res) => {
  try {
    const userId = req.userId; // Falta auth middleware
    const cart = await cartService.getUserCart(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cartItem = await cartService.addToCart(userId, productId, quantity);
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para actualizar la cantidad que lleva el user de un producto

const updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cartItem = await cartService.updateCart(userId, productId, quantity);
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    await cartService.removeFromCart(userId, productId);
    res.json({ message: 'Item eliminado del carro.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCartTotal = async (req, res) => {
  try {
    const userId = req.userId; // Setearlo desde el auth middleware que falta
    const total = await cartService.getCartTotal(userId);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserCart,
  addToCart,
  updateCart,
  removeFromCart,
  getCartTotal,
};
