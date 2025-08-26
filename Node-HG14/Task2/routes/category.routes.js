const { Router } = require('express');
const Category = require('../models/Category');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: 'Не удалось создать категорию', error: err.message });
  }
});

router.get('/', async (_req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении категорий', error: err.message });
  }
});

module.exports = router;
