const Product = require("../models/product.dao.js");

const productController = {
  // Obtener todos los productos
  async getAllProducts(req, res) {
    try {
      const products = await Product.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Obtener un producto por ID
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      if (error.status === 404) {
        res.status(404).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  // Crear un nuevo producto
  async createProduct(req, res) {
    try {
      const newProduct = await Product.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Actualizar un producto existente
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updatedProduct = await Product.updateProduct(id, req.body);
      res.status(200).json(updatedProduct);
    } catch (error) {
      if (error.status === 404) {
        res.status(404).json({ message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  // Eliminar un producto existente
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await Product.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = productController;
