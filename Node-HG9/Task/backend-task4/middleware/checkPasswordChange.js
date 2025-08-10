module.exports = function checkPasswordChange(req, res, next) {
  if (req.user && req.user.mustChangePassword) {
    return res.status(403).json({
      error: 'Пароль должен быть изменён перед продолжением работы.',
      requirePasswordChange: true
    });
  }
  next();
};
