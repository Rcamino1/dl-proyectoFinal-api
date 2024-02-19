const express = require("express");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();
const { authenticateToken, isAdmin } = require("../../middlewares");

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Route for adding a product to the cart (requires JWT authentication)
router.post("/", authenticateToken, async (req, res) => {
  const { productId, cantidad } = req.body;

  // Check if the productId and cantidad are valid
  if (!productId || !cantidad) {
    return res.sendStatus(400);
  }

  // Check if the product exists in the database
  const product = await pool.query("SELECT * FROM producto WHERE id = $1", [
    productId,
  ]);

  if (product.rowCount === 0) {
    return res.sendStatus(404);
  }

  // Check if the user has a cart, if not, create a new one
  const userId = req.user.id;
  const checkCart = await pool.query(
    "SELECT * FROM carro WHERE usuario_id = $1",
    [userId]
  );

  let carroId;
  if (checkCart.rowCount === 0) {
    // Insert a new cart for the user
    const result = await pool.query(
      "INSERT INTO carro (usuario_id) VALUES ($1) RETURNING id",
      [userId]
    );

    carroId = result.rows[0].id;
  } else {
    carroId = checkCart.rows[0].id;
  }

  // Insert a new item into the cart
  await pool.query(
    "INSERT INTO carro_producto (carro_id, producto_id, cantidad) VALUES ($1, $2, $3)",
    [carroId, productId, cantidad]
  );

  res.sendStatus(201);
});

// Route for updating an item in the cart (requires JWT authentication)
router.put("/:id", authenticateToken, async (req, res) => {
  const { cantidad } = req.body;
  const productId = req.params.id;

  // Check if the productId and cantidad are valid
  if (!productId || !cantidad) {
    return res.sendStatus(400);
  }

  // Check if the product exists in the database
  const product = await pool.query("SELECT * FROM producto WHERE id = $1", [
    productId,
  ]);

  if (product.rowCount === 0) {
    return res.sendStatus(404);
  }

  // Check if the user has a cart
  const userId = req.user.id;
  const checkCart = await pool.query(
    "SELECT * FROM carro WHERE usuario_id = $1",
    [userId]
  );

  if (checkCart.rowCount === 0) {
    return res.sendStatus(404);
  }

  // Update the item in the cart
  await pool.query(
    "UPDATE carro_producto SET cantidad = $1 WHERE carro_id = $2 AND producto_id = $3",
    [cantidad, checkCart.rows[0].id, productId]
  );

  res.sendStatus(200);
});

// Route for getting the cart (requires JWT authentication)
router.get("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  // Check if the user has a cart
  const checkCart = await pool.query(
    "SELECT * FROM carro WHERE usuario_id = $1",
    [userId]
  );

  if (checkCart.rowCount === 0) {
    return res.sendStatus(404);
  }

  const carroId = checkCart.rows[0].id;

  // Get all items from the cart
  const items = await pool.query(
    "SELECT producto_id, cantidad FROM carro_producto WHERE carro_id = $1",
    [carroId]
  );

  // Get the details of each product in the cart
  const products = [];
  for (const item of items.rows) {
    const product = await pool.query("SELECT * FROM producto WHERE id = $1", [
      item.producto_id,
    ]);

    products.push({
      id: product.rows[0].id,
      nombre: product.rows[0].nombre,
      precio: product.rows[0].precio,
      img_url: product.rows[0].img_url,
      cantidad: item.cantidad,
    });
  }

  res.json(products);
});

// Route for removing an item from the cart (requires JWT authentication)
router.delete("/:id", authenticateToken, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  // Check if the productId is valid
  if (!productId) {
    return res.sendStatus(400);
  }

  // Check if the user has a cart
  const checkCart = await pool.query(
    "SELECT * FROM carro WHERE usuario_id = $1",
    [userId]
  );

  if (checkCart.rowCount === 0) {
    return res.sendStatus(404);
  }

  // Remove the item from the cart
  await pool.query(
    "DELETE FROM carro_producto WHERE carro_id = $1 AND producto_id = $2",
    [checkCart.rows[0].id, productId]
  );

  res.sendStatus(200);
});

module.exports = router;
