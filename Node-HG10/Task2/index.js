const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

app.use(express.json());

const users = [
  {
    id: 1,
    username: 'alice',
    email: 'alice@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    id: 2,
    username: 'bob',
    email: 'bob@example.com',
    password: bcrypt.hashSync('qwerty', 10),
  },
];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Токен не найден в заголовке Authorization' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Некорректный формат заголовка Authorization' });
  }
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ error: 'Недействительный или просроченный токен' });
    }
    req.user = payload;
    next();
  });
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Укажите username и password в теле запроса' });
  }
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Неверный username или password' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Неверный username или password' });
  }
  const payload = { id: user.id, username: user.username };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  return res.json({
    token,
    user: { id: user.id, username: user.username, email: user.email },
  });
});

app.put('/update-email', authenticateJWT, (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Поле email обязательно' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Некорректный формат email' });
  }
  const userIdFromToken = req.user.id;
  const user = users.find((u) => u.id === userIdFromToken);
  if (!user) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }
  user.email = email;
  return res.json({
    message: 'Email успешно обновлён',
    user: { id: user.id, username: user.username, email: user.email },
  });
});

app.delete('/delete-account', authenticateJWT, (req, res) => {
  const userIdFromToken = req.user.id;
  const idx = users.findIndex((u) => u.id === userIdFromToken);
  if (idx === -1) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }
  const deleted = users.splice(idx, 1)[0];
  return res.json({
    message: 'Аккаунт успешно удалён',
    user: { id: deleted.id, username: deleted.username, email: deleted.email },
  });
});

app.get('/', (req, res) => {
  res.send('Server is up. Use /login, /update-email, /delete-account endpoints.');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
