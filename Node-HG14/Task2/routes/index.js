const { Router } = require('express');
const categoryRoutes = require('./category.routes'); 
const productRoutes = require('./product.routes'); 

const router = Router();

router.get('/', (_req, res) => { 
  res.send('Server is up '); 
}); 

router.get('/health', (_req, res) => { 
  res.status(200).json({ status: 'ok' }); 
}); 

router.use('/categories', categoryRoutes); 
router.use('/products', productRoutes); 

module.exports = router; 
