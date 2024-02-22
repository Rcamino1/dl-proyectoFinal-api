const {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../models/Product');

const getAllProducts = async () => {
  return await findAllProducts();
};

const getProductById = async (productId) => {
  return await findProductById(productId);
};

const addNewProduct = async (productData, userRole) => {
  if (userRole !== 'admin') {
    throw new Error('Solo el administrador puede agregar nuevos productos');
  }
  return await createProduct(productData);
};

const updateExistingProduct = async (productId, productData, userRole) => {
  if (userRole !== 'admin') {
    throw new Error('Solo el administrador puede actualizar productos');
  }
  return await updateProduct(productId, productData);
};

const removeProduct = async (productId, userRole) => {
  if (userRole !== 'admin') {
    throw new Error('Solo el administrador puede eliminar productos');
  }
  return await deleteProduct(productId);
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateExistingProduct,
  removeProduct,
};
