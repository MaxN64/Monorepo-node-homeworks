
const express = require('express');


const { register, login, changePassword, deleteAccount, changeEmail } = require('../controllers/authController');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');

const router = express.Router();

// регистрация
router.post('/register', register);

// логин
router.post('/login', login);

// смена пароля
router.post('/change-password', changePassword);

// удаление аккаунта (только авторизованные)
router.post('/delete-account', requireAuth, deleteAccount);

// [ADDED] изменение email (только авторизованные)
router.post('/change-email', requireAuth, changeEmail);

// доступ к админке (только admin)
router.get('/admin', requireAuth, requireRole('admin'), (req, res) => {
  return res.json({
    ok: true,
    admin: true,
    user: { id: req.user.id, role: req.user.role }
  });
});

// пинг
router.get('/_routes_ping', (req, res) => res.json({ ok: true }));

module.exports = router;

