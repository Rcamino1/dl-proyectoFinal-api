const {
  getCartByUserId,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  calculateCartTotal,
} = require('../models/Cart');

// Todas estas son medias redundantes, pero podrían servir en el futuro para agregarles más funciones, como descuentos al carro.

const getUserCart = async (userId) => {
  return await getCartByUserId(userId);
};

const addToCart = async (userId, productId, quantity) => {
  return await addItemToCart(userId, productId, quantity);
};

const updateCart = async (userId, productId, quantity) => {
  return await updateCartItem(userId, productId, quantity);
};

const removeFromCart = async (userId, productId) => {
  return await removeItemFromCart(userId, productId);
};

const getCartTotal = async (userId) => {
  return await calculateCartTotal(userId);
};

module.exports = {
  getUserCart,
  addToCart,
  updateCart,
  removeFromCart,
  getCartTotal,
};
