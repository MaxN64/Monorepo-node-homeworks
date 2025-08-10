
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { app: AppConfig } = require(path.join(__dirname, 'config', 'config'));
const authRoutes = require(path.join(__dirname, 'routes', 'auth'));

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'development' }));

app.use('/', authRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден.' });
});

app.use((err, req, res, next) => {
  
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

const PORT = AppConfig.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
