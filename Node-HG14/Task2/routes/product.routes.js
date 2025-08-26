const { Router } = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const categoryExists = await Category.exists({ _id: category });
    if (!categoryExists) {
      return res.status(400).json({ message: 'Указанная категория не существует' });
    }

    const product = await Product.create({ name, price, category });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Не удалось создать продукт', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const products = await Product
      .find(filter)
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении продуктов', error: err.message });
  }
});

module.exports = router;
