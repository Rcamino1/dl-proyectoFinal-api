const db = require("../database/db");

const Cart = {
  async getAllItemsByUserId(userId) {
    const query = "SELECT * FROM Carro WHERE id_usuario = $1";
    const values = [userId];
    return db(query, values);
  },

  async addItem(userId, productId, quantity) {
    const query =
      "INSERT INTO Carro (id_usuario, id_producto, cantidad) VALUES ($1, $2, $3) RETURNING *";
    const values = [userId, productId, quantity];
    return db(query, values);
  },

  async updateItemQuantity(cartItemId, newQuantity) {
    const query =
      "UPDATE Carro SET cantidad = $1 WHERE id_carro = $2 RETURNING *";
    const values = [newQuantity, cartItemId];
    return db(query, values);
  },

  async removeItem(cartItemId) {
    const query = "DELETE FROM Carro WHERE id_carro = $1";
    const values = [cartItemId];
    return db(query, values);
  },
};

module.exports = Cart;
