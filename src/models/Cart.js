const pool = require('../config/dbConfig');

const getCartByUserId = async (userId) => {
  const { rows } = await pool.query(
    'SELECT * FROM Carro WHERE id_usuario = $1',
    [userId]
  );
  return rows;
};

const addItemToCart = async (userId, productId, quantity) => {
  const { rows } = await pool.query(
    'INSERT INTO Carro (id_usuario, id_producto, cantidad) VALUES ($1, $2, $3) RETURNING *',
    [userId, productId, quantity]
  );
  return rows[0];
};

const updateCartItem = async (userId, productId, quantity) => {
  const { rows } = await pool.query(
    'UPDATE Carro SET cantidad = $3 WHERE id_usuario = $1 AND id_producto = $2 RETURNING *',
    [userId, productId, quantity]
  );
  return rows[0];
};

const removeItemFromCart = async (userId, productId) => {
  const { rows } = await pool.query(
    'DELETE FROM Carro WHERE id_usuario = $1 AND id_producto = $2 RETURNING *',
    [userId, productId]
  );
  return rows[0];
};

// Usar esta función para el momento de check out, antes en la página de Cart calcularo en el front-end
const calculateCartTotal = async (userId) => {
  const { rows } = await pool.query(
    'SELECT SUM(p.precio * c.cantidad) AS total ' +
      'FROM Carro c ' +
      'JOIN Producto p ON c.id_producto = p.id_producto ' +
      'WHERE c.id_usuario = $1',
    [userId]
  );
  return rows[0].total;
};

module.exports = {
  getCartByUserId,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  calculateCartTotal,
};
