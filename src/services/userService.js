const {
  findUserByEmail,
  createUser,
  updateUserPassword,
  findUserById,
} = require('../models/User');
const roleService = require('./roleService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Authentication failed: User not found.');
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Authentication failed: Incorrect password.');
  }

  const userIsAdmin = await roleService.checkIfAdmin(user.id_usuario);

  const token = jwt.sign(
    { userId: user.id_usuario, role: userIsAdmin ? 'admin' : 'user' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { user, token };
};

const registerNewUser = async (userData) => {
  return await createUser(userData);
};

const changeUserPassword = async (userId, oldPassword, newPassword) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado.');
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
  if (!isMatch) {
    throw new Error('Las contraseñas no coinciden.');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updated = await updateUserPassword(userId, hashedPassword);
  if (!updated) {
    throw new Error('Error en el cambio de contraseña.');
  }

  return { success: true, message: 'Contraseña actualizada con éxito.' };
};

const getUserById = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado.');
  }

  delete user.password_hash; // Para que esta info no sea devuelta.
  return user;
};

module.exports = {
  authenticateUser,
  registerNewUser,
  changeUserPassword,
  getUserById,
};
