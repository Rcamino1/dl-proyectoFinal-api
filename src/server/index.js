const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');
const authRoutes = require('./routes/auth.route.js');
const cartRoutes = require('./routes/cart.route.js');
const productRoutes = require('./routes/product.route.js');
const userRoutes = require('./routes/user.route.js');

config();

module.exports = {
  startServer,
  app
};

const pkg = require('pg');
const { Pool } = pkg;

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
