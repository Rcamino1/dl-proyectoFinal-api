import * as Usuario from "../models/user.dao.js";
import { generateToken } from "../../utils/jwt.js";
import { encrypt, compare } from "../../utils/bcrypt.js";

// Controlador para el proceso de inicio de sesión
export const login = async (req, res) => {
  const { correo_electronico, contraseña } = req.body;

  try {
    // Obtener usuario por correo electrónico desde la base de datos
    const [user] = await Usuario.findUserByEmail(correo_electronico);

    // Verificar si el usuario existe y la contraseña es correcta
    if (user && (await compare(contraseña, user.contraseña_hash))) {
      const token = generateToken({
        correo_electronico: user.correo_electronico,
        rol: user.rol,
        lenguage: user.lenguage,
      });
      res.status(200).json({ token });  // Responder con un token en caso de éxito
    } else {
      res.status(401).json({
        code: 401,
        message: "Credenciales incorrectas",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Controlador para registrar un nuevo usuario
export const register = async (req, res) => {
  const { nombre, apellido, correo_electronico, contraseña } = req.body;

  try {
    // Encriptar la contraseña antes de almacenarla en la base de datos
    const contraseña_hash = await encrypt(contraseña);

    // Insertar el nuevo usuario en la base de datos
    const [newUser] = await Usuario.register({
      nombre,
      apellido,
      correo_electronico,
      contraseña_hash,
    });

    res.status(201).json({
      id_usuario: newUser.id_usuario,
      correo_electronico: newUser.correo_electronico,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Controlador para obtener datos de un usuario autenticado
export const findUserByEmail = async (req, res) => {
  try {
    const [, token] = req.headers.authorization.split(" ");
    const { correo_electronico } = jwtVerify(token);
  
    const user = await Usuario.findUserByEmail(correo_electronico);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({
      code: 401,
      message: "Problema con el token JWT",
    });
  }
};

