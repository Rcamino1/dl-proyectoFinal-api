const express = require("express");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  authenticateToken,
  isAdmin,
} = require("../middlewares/auth.middlewares");
const bcrypt = require("bcryptjs");

const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Route for creating a new user (no authentication required)
router.post("/", async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });

  // Insert the user into the database
  const result = await pool.query(
    "INSERT INTO usuario (nombre, apellido, email, password_hash) VALUES ($1, $2, $3, $4)",
    [nombre, apellido, email, hashedPassword]
  );

  // Return the inserted user details
  const user = await pool.query("SELECT * FROM usuario WHERE id = $1", [
    result.insertId,
  ]);

  res.json(user.rows[0]);
});

// Route for getting all users (requires JWT authentication with admin role)
router.get("/", authenticateToken, isAdmin, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.sendStatus(403);
  }

  const result = await pool.query("SELECT * FROM usuario");

  res.json(result.rows);
});

// Route for getting a user by ID (requires JWT authentication)
router.get("/:id", authenticateToken, async (req, res) => {
  const result = await pool.query("SELECT * FROM usuario WHERE id = $1", [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.sendStatus(404);
  }

  res.json(result.rows[0]);
});

// Route for updating a user (requires JWT authentication with admin role)
router.put("/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.sendStatus(403);
  }

  const { nombre, apellido, email, password } = req.body;

  if (password) {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });

    // Update the user with the hashed password
    await pool.query(
      "UPDATE usuario SET nombre = $1, apellido = $2, email = $3, password_hash = $4 WHERE id = $5",
      [nombre, apellido, email, hashedPassword, req.params.id]
    );
  } else {
    // Update the user without changing the password
    await pool.query(
      "UPDATE usuario SET nombre = $1, apellido = $2, email = $3 WHERE id = $4",
      [nombre, apellido, email, req.params.id]
    );
  }

  const updatedUser = await pool.query("SELECT * FROM usuario WHERE id = $1", [
    req.params.id,
  ]);

  res.json(updatedUser.rows[0]);
});

// Route for deleting a user (requires JWT authentication with admin role)
router.delete("/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.sendStatus(403);
  }

  await pool.query("DELETE FROM usuario WHERE id = $1", [req.params.id]);

  res.sendStatus(204);
});

module.exports = router;
