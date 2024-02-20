import db from '../database.js';

const Product = {
  // Obtener todos los productos
  async getAllProducts() {
    try {
      const query = "SELECT * FROM producto";
      const products = await db(query);
      return products;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un producto por ID
  async getProductById(id) {
    try {
      const query = "SELECT * FROM producto WHERE id = $1";
      const values = [id];
      const product = await db(query, values);
      if (product.length === 0) {
        throw { status: 404, message: "Product not found" };
      }
      return product[0];
    } catch (error) {
      throw error;
    }
  },

  // Crear un nuevo producto
  async createProduct(productData) {
    try {
      const { nombre, precio, img_url, descripcion, detalle } = productData;
      const query = "INSERT INTO producto (nombre, precio, img_url, descripcion, detalle) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const values = [nombre, precio, img_url, descripcion, detalle];
      const newProduct = await db(query, values);
      return newProduct[0];
    } catch (error) {
      throw error;
    }
  },

  // Actualizar un producto existente
  async updateProduct(id, productData) {
    try {
      const { nombre, precio, img_url, descripcion, detalle } = productData;
      const query = "UPDATE producto SET nombre = $1, precio = $2, img_url = $3, descripcion = $4, detalle = $5 WHERE id = $6 RETURNING *";
      const values = [nombre, precio, img_url, descripcion, detalle, id];
      const updatedProduct = await db(query, values);
      if (updatedProduct.length === 0) {
        throw { status: 404, message: "Product not found" };
      }
      return updatedProduct[0];
    } catch (error) {
      throw error;
    }
  },

  // Eliminar un producto existente
  async deleteProduct(id) {
    try {
      const query = "DELETE FROM producto WHERE id = $1";
      const values = [id];
      await db(query, values);
    } catch (error) {
      throw error;
    }
  }
};

export default Product;

