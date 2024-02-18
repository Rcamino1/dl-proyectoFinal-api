const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

// Connect to the database
const pool = new Pool({
  connectionString: process.env.PG_DB,
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if the email is in the database
  const user = await pool.query(
    'SELECT * FROM usuario WHERE email = $1',
    [email]
  );

  if (user.rows.length === 0) {
    return res.status(401).json({
      message: 'Invalid credentials',
    });
  }

  // Compare the password
  const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);

  if (!validPassword) {
    return res.status(401).json({
      message: 'Invalid credentials',
    });
  }

  // Generate a JWT token
  const token = jwt.sign(
    { id: user.rows[0].id, role: user.rows[0].rol },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Return the token and user details
  res.json({
    token,
    user: {
      id: user.rows[0].id,
      nombre: user.rows[0].nombre,
      apellido: user.rows[0].apellido,
      email: user.rows[0].email,
      role: user.rows[0].rol,
    },
  });
});

module.exports = router;