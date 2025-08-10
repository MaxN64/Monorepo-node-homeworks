

const { User } = require('../models');

module.exports = async function requireAuth(req, res, next) {
  try {
    if (!req.user && process.env.NODE_ENV !== 'production') {
      const idFromHeader = Number(req.header('x-user-id') || '');
      if (idFromHeader) {
        let role = undefined;
        try {
          const u = await User.findByPk(idFromHeader, { attributes: ['id', 'role'] });
          if (u) role = u.role;
        } catch {}
        const roleFromHeader = (req.header('x-user-role') || '').toLowerCase();
        if (roleFromHeader) role = roleFromHeader; // dev-only override
        req.user = { id: idFromHeader, role };
      }
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }

    if (!req.user.role) {
      try {
        const u = await User.findByPk(req.user.id, { attributes: ['id', 'role'] });
        if (u) req.user.role = u.role;
      } catch {}
    }

    return next();
  } catch (err) {
    console.error('requireAuth error:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};
