
module.exports = function requireRole(requiredRole) {
  return function (req, res, next) {
    const role = req.user && req.user.role;
    if (!role) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }
    if (role !== requiredRole) {
      return res.status(403).json({ error: 'Доступ запрещён: требуется роль ' + requiredRole });
    }
    return next();
  };
};
