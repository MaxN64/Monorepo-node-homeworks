
const bcrypt = require('bcrypt');
const { validateCredentials } = require('../utils/validate');
const { User } = require('../models');

const ROUNDS = 12; 


// Регистрация нового пользователя

async function register(req, res) {
  try {
    const { email: rawEmail, password: rawPassword } = req.body || {};

    // базовая валидация и нормализация
    const v = validateCredentials(rawEmail, rawPassword);
    if (!v.ok) return res.status(400).json({ error: v.error });
    const { email, password } = v;

    // проверяем дубликат email
    const existing = await User.findOne({
      where: { email },
      attributes: ['id'],
    });
    if (existing) {
      return res
        .status(409)
        .json({ error: 'Пользователь с таким email уже существует' });
    }

    // хешируем пароль
    const password_hash = await bcrypt.hash(password, ROUNDS);

    // создаём пользователя; явно фиксируем, что смена пароля не требуется
    const user = await User.create({
      email,
      password_hash,
      mustChangePassword: false,
    });

    return res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}


// Вход пользователя

async function login(req, res) {
  try {
    const { email: rawEmail, password: rawPassword } = req.body || {};

    // базовая валидация и нормализация
    const v = validateCredentials(rawEmail, rawPassword);
    if (!v.ok) return res.status(400).json({ error: v.error });
    const { email, password } = v;

    // ищем пользователя и забираем хеш + флаг mustChangePassword
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'password_hash', 'mustChangePassword'],
    });
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    // сверяем пароль
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    // отдаём флаг mustChangePassword, чтобы фронт мог показать форму смены пароля
    return res.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        mustChangePassword: user.mustChangePassword,
      },
    });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}


// Смена пароля + сброс флага mustChangePassword

async function changePassword(req, res) {
  try {
    
    const { userId, newPassword } = req.body || {};

    if (!newPassword || newPassword.length < 8) {
      return res
        .status(400)
        .json({ error: 'Пароль должен быть не короче 8 символов.' });
    }

    // проверим, что пользователь существует
    const user = await User.findByPk(userId, {
      attributes: ['id'],
    });
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    // хешируем новый пароль
    const password_hash = await bcrypt.hash(newPassword, ROUNDS);

    // обновляем пароль и сбрасываем флаг mustChangePassword
    await User.update(
      { password_hash, mustChangePassword: false },
      { where: { id: userId } }
    );

    return res.json({ ok: true });
  } catch (err) {
    console.error('changePassword error:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

module.exports = { register, login, changePassword };
