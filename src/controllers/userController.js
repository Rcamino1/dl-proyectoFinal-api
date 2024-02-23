const userService = require('../services/userService');

const register = async (req, res) => {
  try {
    const user = await userService.registerNewUser(req.body);
    res.status(201).json({ message: 'Usuario registrado exitosamente.', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const result = await userService.authenticateUser(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body; // Aquí hay que configurarlo para que le llegue el userId del token que va a tener asignado.
    const result = await userService.changeUserPassword(
      userId,
      oldPassword,
      newPassword
    );
    res.json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params; // Hay que rutearlo para que esté el id en el URL
    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  changePassword,
  getUserById,
};
