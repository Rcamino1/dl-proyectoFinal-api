import Cart from '../models/cart.dao.js';

const cartController = {
  async getAllItemsByUserId(req, res) {
    try {
      const userId = req.params.userId; // Suponiendo que el userId se pasa como parámetro en la ruta
      const cartItems = await Cart.getAllItemsByUserId(userId);
      res.status(200).json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async addItem(req, res) {
    try {
      const { userId, productId, quantity } = req.body;
      const newItem = await Cart.addItem(userId, productId, quantity);
      res.status(201).json(newItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateItemQuantity(req, res) {
    try {
      const { cartItemId } = req.params;
      const { newQuantity } = req.body;
      const updatedItem = await Cart.updateItemQuantity(cartItemId, newQuantity);
      res.status(200).json(updatedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async removeItem(req, res) {
    try {
      const { cartItemId } = req.params;
      await Cart.removeItem(cartItemId);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default cartController;
