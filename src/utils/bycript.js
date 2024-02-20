import bcrypt from "bcryptjs";

// Función para encriptar una contraseña
export const encrypt = (password) => bcrypt.hashSync(password);

// Función para comparar una contraseña con su versión encriptada
export const compare = (password, encryptedPassword) =>
  bcrypt.compareSync(password, encryptedPassword);

