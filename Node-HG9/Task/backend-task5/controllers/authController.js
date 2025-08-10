
const bcrypt = require('bcrypt');
const { validateCredentials, validateEmail } = require('../utils/validate'); 
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

    // Проверим, что такого email ещё нет
    const existing = await User.findOne({
      where: { email },
      attributes: ['id'],
    });
    if (existing) {
      return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
    }

    // Хешируем пароль
    const password_hash = await bcrypt.hash(password, ROUNDS);

    // Создаём пользователя; флаг mustChangePassword на старте выключен
    const user = await User.create({
      email,
      password_hash,
      mustChangePassword: false,
      role: 'user', 
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

    // Ищем пользователя по email
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'password_hash', 'mustChangePassword', 'role'], 
    });

    // Чтобы не раскрывать, существует ли email — отвечаем одинаково при ошибке
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    // Сверяем пароль
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    return res.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        mustChangePassword: user.mustChangePassword,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}


// Смена пароля + сброс флага mustChangePassword
// (в текущей версии ожидает { userId, newPassword } в теле запроса)

async function changePassword(req, res) {
  try {
   
    const { userId, newPassword } = req.body || {};

    if (!userId) {
      return res.status(400).json({ error: 'Не указан userId' });
    }
    if (!newPassword || String(newPassword).length < 8) {
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
    const password_hash = await bcrypt.hash(String(newPassword), ROUNDS);

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



// Удаление аккаунта. Доступен только авторизованным пользователям (req.user.id).
// Перед удалением подтверждаем текущий пароль через bcrypt.compare.

async function deleteAccount(req, res) {
  try {
    // Требуем авторизацию: req.user.id должен быть установлен auth-мидлварем
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }

    const { password } = req.body || {};
    if (!password) {
      return res.status(400).json({ error: 'Укажите текущий пароль' });
    }

    // Загружаем пользователя вместе с хешем пароля
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'password_hash'],
    });
    if (!user) {
      // маловероятно для авторизованного запроса, но обработаем
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    // Сравниваем введённый пароль с хешем
    const ok = await bcrypt.compare(String(password), user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Неверный пароль' });
    }

    // Удаляем аккаунт
    await User.destroy({ where: { id: user.id } });

    // Возвращаем лаконичный ответ
    return res.json({ ok: true, deleted: true });
  } catch (err) {
    console.error('deleteAccount error:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}


// Изменение email. Требует авторизации и подтверждения текущего пароля.

async function changeEmail(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }

    const { newEmail, password } = req.body || {};

    // валидируем новый email
    const v = validateEmail(newEmail);
    if (!v.ok) return res.status(400).json({ error: v.error });
    const email = v.email;

    if (!password) {
      return res.status(400).json({ error: 'Укажите текущий пароль' });
    }

    // найдём пользователя и заберём хеш
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'password_hash'],
    });
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    // подтверждаем текущий пароль
    const ok = await bcrypt.compare(String(password), user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Неверный пароль' });
    }

    // если email не меняется — ничего не делаем
    if (user.email.toLowerCase() === email) {
      return res.json({ ok: true, email });
    }

    // проверка уникальности нового email
    const exists = await User.findOne({ where: { email }, attributes: ['id'] });
    if (exists && exists.id !== user.id) {
      return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
    }

    // обновляем email
    await User.update({ email }, { where: { id: user.id } });

    return res.json({ ok: true, email });
  } catch (err) {
    console.error('changeEmail error:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

module.exports = { register, login, changePassword, deleteAccount, changeEmail };
