const pool = require('../config/dbConfig');

const findRoleById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM Rol WHERE id_cred = $1', [
    id,
  ]);
  return rows[0];
};

const isAdmin = async (userId) => {
  const { rows } = await pool.query(
    'SELECT r.rol FROM Usuario u JOIN Rol r ON u.id_cred = r.id_cred WHERE u.id_usuario = $1',
    [userId]
  );
  return rows[0] && rows[0].rol === 'admin';
};

module.exports = {
  findRoleById,
  isAdmin,
};
