
const express = require('express');

//  добавили импорт changePassword из контроллера
const { register, login, changePassword } = require('../controllers/authController'); // [CHANGED]

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// новый маршрут для смены пароля
router.post('/change-password', changePassword); // [ADDED]

// пинг
router.get('/_routes_ping', (req, res) => res.json({ ok: true }));

module.exports = router;
