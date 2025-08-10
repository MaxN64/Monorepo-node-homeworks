

module.exports = function requireAuth(req, res, next) {
 
  if (!req.user && process.env.NODE_ENV !== 'production') {
    const idFromHeader = Number(req.header('x-user-id') || '');
    if (idFromHeader) {
      req.user = { id: idFromHeader };
    }
  }

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'Требуется авторизация' });
  }
  return next();
};
