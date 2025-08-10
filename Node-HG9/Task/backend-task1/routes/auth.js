const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/_routes_ping', (req, res) => res.json({ ok: true }));
module.exports = router;
