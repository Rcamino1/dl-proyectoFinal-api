const HTTP_STATUS = require("../../config/constants.js");

// Controlador para manejar solicitudes a rutas no encontradas
const notFound = (_, res) =>
  res
    .status(HTTP_STATUS.not_found.code)
    .json({
      code: HTTP_STATUS.not_found.code,
      message: HTTP_STATUS.not_found.text,
    });

module.exports = {
  notFound
};
