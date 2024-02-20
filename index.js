const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
const authRoutes = require('./src/routes/auth.js');
const cartRoutes = require('./src/routes/cart.js');
const productRoutes = require('./src/routes/product.js');
const userRoutes = require('./src/routes/user.js');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.PG_DB,
  ssl: {
    rejectUnauthorized: false,
  },
});

const startServer = async () => {
  app.use('/auth', authRoutes);
  app.use('/cart', cartRoutes);
  app.use('/product', productRoutes);
  app.use('/user', userRoutes);

  const port = process.env.PORT || 3001;

  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  return server;
};

module.exports = { startServer, app };