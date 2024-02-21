const pool = require('../config/dbConfig');

const findAllProducts = async () => {
  const { rows } = await pool.query('SELECT * FROM Producto');
  return rows;
};

const findProductById = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM Producto WHERE id_producto = $1',
    [id]
  );
  return rows[0];
};

const createProduct = async (product) => {
  const { nombre, precio, img_url, descripcion, detalle } = product;
  const { rows } = await pool.query(
    'INSERT INTO Producto (nombre, precio, img_url, descripcion, detalle) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nombre, precio, img_url, descripcion, detalle]
  );
  return rows[0];
};

const updateProduct = async (id, productUpdates) => {
  const { nombre, precio, img_url, descripcion, detalle } = productUpdates;
  const { rows } = await pool.query(
    'UPDATE Producto SET nombre = $1, precio = $2, img_url = $3, descripcion = $4, detalle = $5 WHERE id_producto = $6 RETURNING *',
    [nombre, precio, img_url, descripcion, detalle, id]
  );
  return rows[0];
};

const deleteProduct = async (id) => {
  const { rows } = await pool.query(
    'DELETE FROM Producto WHERE id_producto = $1 RETURNING *',
    [id]
  );
  return rows[0];
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
