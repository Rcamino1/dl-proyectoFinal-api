const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por el ID

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params; // Siguiendo con la lógica del ID en la URL.
    const product = await productService.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
};

const addNewProduct = async (req, res) => {
  // Falta middleware de autenticación todavía...
  try {
    const userRole = req.userRole;
    const productData = req.body;
    const product = await productService.addNewProduct(productData, userRole);
    res.status(201).json(product);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const productData = req.bodyM;
    const userRole = req.userRole; // Falta este middleware todavía
    const product = await productService.updateExistingProduct(
      productId,
      productData,
      userRole
    );
    res.json(product);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userRole = req.userRole; // Falta este middleware todavía
    await productService.removeProduct(productId, userRole);
    res.json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  removeProduct,
};
