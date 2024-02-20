import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_SECRET_KEY;  // Obtener la clave secreta JWT del entorno

// Función para firmar un token JWT con un payload dado
export const jwtSign = (payload) => jwt.sign(payload, KEY);

// Función para verificar y decodificar un token JWT
export const jwtVerify = (token) => jwt.verify(token, KEY);
