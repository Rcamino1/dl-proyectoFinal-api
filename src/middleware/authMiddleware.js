const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    // Simulate a successful authentication by adding a mock user object
    req.user = { id: 'mockUserId', role: 'mockUserRole' };
    return next();
  }
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('decoded', decoded);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token no válido' });
    }
  } else {
    res.status(401).json({ message: 'No hay token' });
  }
};

module.exports = authMiddleware;
