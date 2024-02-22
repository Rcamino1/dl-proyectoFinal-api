const { findRoleById, isAdmin } = require('../models/Role');

const getRoleById = async (id) => {
  //Todavía no se me ocurre para qué podríamos usar esta función, pero mejor tenerla acá para modificarla cualquier cosa.
  return await findRoleById(id);
};

const checkIfAdmin = async (userId) => {
  return await isAdmin(userId);
};

module.exports = {
  getRoleById,
  checkIfAdmin,
};
