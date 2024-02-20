const bcrypt = require("bcryptjs");

// Función para encriptar una contraseña
const encrypt = (password) => bcrypt.hashSync(password);

// Función para comparar una contraseña con su versión encriptada
const compare = (password, encryptedPassword) =>
  bcrypt.compareSync(password, encryptedPassword);

module.exports = {
  encrypt,
  compare,
};
