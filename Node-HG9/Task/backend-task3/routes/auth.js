
const express = require('express');


const { register, login, changePassword, deleteAccount } = require('../controllers/authController'); // [CHANGED]
const requireAuth = require('../middleware/requireAuth'); 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// новый маршрут для смены пароля
router.post('/change-password', changePassword); // [ADDED]

//  удаление аккаунта (только авторизованные)
router.post('/delete-account', requireAuth, deleteAccount); // [ADDED]

// пинг
router.get('/_routes_ping', (req, res) => res.json({ ok: true }));

module.exports = router;
