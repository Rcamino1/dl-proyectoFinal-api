import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { config } from 'dotenv';
import authRoutes from './routes/auth.route.js';
import cartRoutes from './routes/cart.route.js';
import productRoutes from './routes/product.route.js';
import userRoutes from './routes/user.route.js';

config();

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

export { startServer, app };
