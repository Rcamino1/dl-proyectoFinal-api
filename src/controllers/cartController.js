const cartService = require('../services/cartService');

const getUserCart = async (req, res) => {
  console.log('getUserCart controller reached', req.body);
  try {
    const userId = req.user.userId;
    console.log('userId', userId);
    const cart = await cartService.getUserCart(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  console.log('addToCart controller reached', req.body);
  try {
    const userId = req.user.userId;
    console.log('userId', userId);
    const { productId, quantity } = req.body;
    const cartItem = await cartService.addToCart(userId, productId, quantity);
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para actualizar la cantidad que lleva el user de un producto

const updateCart = async (req, res) => {
  console.log('updateCart controller reached', req.body);
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;
    const cartItem = await cartService.updateCart(userId, productId, quantity);
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  console.log('removeFromCart controller reached', req.body);
  try {
    const userId = req.user.userId;
    const { productId } = req.body;
    await cartService.removeFromCart(userId, productId);
    res.json({ message: 'Item eliminado del carro.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCartTotal = async (req, res) => {
  console.log('getCartTotal controller reached', req.body);
  console.log(req.body);
  try {
    const userId = req.user.userId;
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
