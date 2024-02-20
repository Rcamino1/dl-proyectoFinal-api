const express = require("express");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Get all products
router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM producto";
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM producto WHERE id = $1";
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { nombre, precio, img_url, descripcion, detalle } = req.body;
    const query =
      "INSERT INTO producto (nombre, precio, img_url, descripcion, detalle) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [nombre, precio, img_url, descripcion, detalle];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { id } = req.params;
    const { nombre, precio, img_url, descripcion, detalle } = req.body;
    const query =
      "UPDATE producto SET nombre = $1, precio = $2, img_url = $3, descripcion = $4, detalle = $5 WHERE id = $6 RETURNING *";
    const values = [nombre, precio, img_url, descripcion, detalle, id];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { id } = req.params;
    const query = "DELETE FROM producto WHERE id = $1";
    const values = [id];
    await pool.query(query, values);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
