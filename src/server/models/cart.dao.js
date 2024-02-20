const { Pool } = require("pg");

// Configuración de conexión a la base de datos utilizando variables de entorno
const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
};

// Crear un nuevo Pool de PostgreSQL con la configuración proporcionada
const pool = new Pool(config);

// Función para realizar consultas a la base de datos
const db = (query, values) =>
  pool
    .query(query, values)
    .then(({ rows }) => rows) // Devuelve las filas resultantes de la consulta
    .catch(({ code, message }) => {
      const error = { status: "[ERROR]", code, message }; // Formatear error
      throw error; // Lanzar el error para que sea manejado por el controlador correspondiente
    });

export default Cart;
