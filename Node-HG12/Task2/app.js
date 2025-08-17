const express = require('express');
require('dotenv').config();
const { connectToDatabase, getDb } = require('./db');
const { ObjectId } = require('mongodb'); 

const app = express();
app.use(express.json()); 


app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// CREATE: POST /products
app.post('/products', async (req, res) => {
  try {
    const db = getDb();
    const product = req.body; // ожидаем { name, price, description }
    const result = await db.collection('products').insertOne(product);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Не удалось создать продукт' });
  }
});

// READ ALL: GET /products
app.get('/products', async (req, res) => {
  try {
    const db = getDb();
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Не удалось получить продукты' });
  }
});

// READ ONE: GET /products/:id
app.get('/products/:id', async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
    if (!product) return res.status(404).json({ error: 'Продукт не найден' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Неверный ID' });
  }
});

// UPDATE: PUT /products/:id
app.put('/products/:id', async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const updates = req.body; 
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Продукт не найден' });
    res.json({ modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: 'Не удалось обновить продукт' });
  }
});

// DELETE: DELETE /products/:id
app.delete('/products/:id', async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Продукт не найден' });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: 'Не удалось удалить продукт' });
  }
});


// Функция запуска сервера
function startServer() {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
  });
}


connectToDatabase()
  .then(() => {
    console.log(' Подключено к MongoDB');
    startServer();
  })
  .catch((err) => {
    console.error(' Ошибка подключения к MongoDB:', err);
    process.exit(1);
  });
