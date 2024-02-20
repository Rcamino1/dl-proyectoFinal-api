const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

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