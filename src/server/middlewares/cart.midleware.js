import db from '../database.js';

async function isUserForCart(req, res, next) {
  try {
    // Verificar si el usuario está autenticado
    if (!req.user) {
      return res.sendStatus(401);
    }

    // Verificar si el carrito especificado en la solicitud pertenece al usuario actual
    const userId = req.user.id;
    const cartId = req.params.id;

    const query = 'SELECT id_usuario FROM Carro WHERE id_carro = $1';
    const values = [cartId];
    const result = await db(query, values);

    if (result.length === 0 || result[0].id_usuario !== userId) {
      return res.status(404).json({ message: "No such cart exists" });
    }

    // Si llegamos aquí, el usuario está autenticado y el carrito pertenece al usuario actual
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export default isUserForCart;
