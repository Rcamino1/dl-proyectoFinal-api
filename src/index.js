const cors = require('cors');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Prueba para re-deploy

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Servidor ON en el puerto ${PORT}`);
  });
}

module.exports = app;
