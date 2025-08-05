import express from 'express';
import db from './db.js';

const app = express();
app.use(express.json());

app.get('/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const { name, price } = req.body;
    if (typeof name !== 'string' || typeof price !== 'number') {
      return res.status(400).json({ error: 'Неверные данные' });
    }
    const [result] = await db.execute(
      'INSERT INTO products (name, price) VALUES (?, ?)',
      [name, price]
    );
    res.status(201).json({ productId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Сервер на http://localhost:3000');
});
