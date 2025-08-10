
import express from 'express';

import { sequelize, testConnection } from './config/db.js';

import Book from './models/book.js';

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/books', async (req, res, next) => {
  try {
    
    const books = await Book.findAll();
    
    res.json(books);
  } catch (err) {
    next(err); 
  }
});
у
app.post('/books', async (req, res, next) => {
  try {
    
    const { title, author, year } = req.body;
    
    const book = await Book.create({ title, author, year });
    
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});


app.put('/books/:id', async (req, res, next) => {
  try {
    const { id } = req.params; L
    const { title, author, year } = req.body;

   
    const [updated] = await Book.update(
      { title, author, year },  // новые данные
      { where: { id } }         // условие поиска
    );

    if (updated) {
      const updatedBook = await Book.findByPk(id); // читаем обновленную запись
      res.json(updatedBook);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    next(err);
  }
});

app.delete('/books/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Book.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    next(err);
  }
});


app.use((err, req, res, next) => {
  console.error(err); // логируем ошибку на сервере
  res.status(500).json({ error: 'Internal Server Error' });
});


(async () => {
  try {
    await testConnection(); // проверка соединения с БД
    await sequelize.sync(); // синхронизация моделей
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start the server:', err);
    process.exit(1);
  }
})();
