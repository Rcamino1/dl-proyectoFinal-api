const pool = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    'SELECT u.id_usuario, u.nombre, u.apellido, u.email, u.password_hash, u.id_cred, r.rol ' +
      'FROM Usuario u ' +
      'JOIN Rol r ON u.id_cred = r.id_cred ' +
      'WHERE u.email = $1',
    [email]
  );
  const user = rows[0];
  if (user) {
    user.role = user.rol;
  }
  return user;
};

const createUser = async (user) => {
  const { nombre, apellido, email, password } = user;
  const hashedPassword = await bcrypt.hash(password, 10); // Hasheo de la password creada

  const roleQuery = 'Select id_cred FROM Rol Where rol = $1';
  const roleResult = await pool.query(roleQuery, ['user']);
  const id_cred = roleResult.rows[0].id_cred;

  const insertQuery = `
  INSERT INTO Usuario (nombre, apellido, email, password_hash, id_cred)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id_usuario, nombre, apellido, email, id_cred
`;

  const { rows } = await pool.query(insertQuery, [
    nombre,
    apellido,
    email,
    hashedPassword,
    id_cred,
  ]);

  return rows[0];
};

const updateUserPassword = async (id, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10); // Hasheo de la nueva password
  const result = await pool.query(
    'UPDATE Usuario SET password_hash = $1 WHERE id_usuario = $2',
    [hashedPassword, id]
  );

  return result.rowCount === 1; // Falta ver el error handle de esto con un middleware
};

const findUserById = async (id) => {
  const { rows } = await pool.query(
    'SELECT u.id_usuario, u.nombre, u.apellido, u.email, u.id_cred, r.rol ' +
      'FROM Usuario u ' +
      'JOIN Rol r ON u.id_cred = r.id_cred ' +
      'WHERE u.id_usuario = $1',
    [id]
  );
  const user = rows[0];
  if (user) {
    user.role = user.rol;
  }
  return user;
};

module.exports = {
  findUserByEmail,
  createUser,
  updateUserPassword,
  findUserById,
};
