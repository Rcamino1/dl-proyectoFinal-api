const db = require('../database/db.js');
const bcrypt = require('bcryptjs');

const Usuario = {
  async login(email, password) {
    try {
      // Buscamos al usuario por su correo electrónico
      const query = 'SELECT * FROM usuarios WHERE email = $1';
      const result = await db.query(query, [email]);
      const user = result.rows[0];

      if (!user) {
        return null; // Si el usuario no existe, retornamos null
      }
      
      // Comparamos la contraseña ingresada con la contraseña almacenada en la base de datos
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return user; // Si las contraseñas coinciden, retornamos el usuario
      } else {
        return null; // Si las contraseñas no coinciden, retornamos null
      }
    } catch (error) {
      throw error; // Si hay un error, lo lanzamos para manejarlo en el controlador
    }
  },

  async findUserByEmail(email) {
    try {
      // Buscamos al usuario por su correo electrónico
      const query = 'SELECT * FROM usuarios WHERE email = $1';
      const result = await db.query(query, [email]);
      return result.rows[0]; // Retornamos al usuario encontrado
    } catch (error) {
      throw error; // Si hay un error, lo lanzamos para manejarlo en el controlador
    }
  },

  async register(userData) {
    try {
      // Insertamos al nuevo usuario en la base de datos
      const { email, password } = userData;
      const query = 'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *';
      const result = await db.query(query, [email, password]);
      return result.rows; // Retornamos los datos del usuario registrado
    } catch (error) {
      throw error; // Si hay un error, lo lanzamos para manejarlo en el controlador
    }
  }
};

module.exports = Usuario;
