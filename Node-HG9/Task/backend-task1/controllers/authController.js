const bcrypt = require('bcrypt');
const { validateCredentials } = require('../utils/validate');
const { User } = require('../models');


async function register(req, res) {
  try {
    const { email: rawEmail, password: rawPassword } = req.body || {};
    const v = validateCredentials(rawEmail, rawPassword);
    if (!v.ok) return res.status(400).json({ error: v.error });
    const { email, password } = v;

    const existing = await User.findOne({ where: { email }, attributes: ['id'] });
    if (existing) return res.status(409).json({ error: 'Пользователь с таким email уже существует' });

    const password_hash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password_hash });

    return res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}


async function login(req, res) {
  try {
    const { email: rawEmail, password: rawPassword } = req.body || {};
    const v = validateCredentials(rawEmail, rawPassword);
    if (!v.ok) return res.status(400).json({ error: v.error });
    const { email, password } = v;

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'password_hash']
    });
    if (!user) return res.status(401).json({ error: 'Неверный email или пароль' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Неверный email или пароль' });

    return res.json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

module.exports = { register, login };

