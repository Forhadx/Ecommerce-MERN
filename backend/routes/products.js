
const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.get('/product/:pId', productsController.fetchProductById);

router.get('/product/:pName', productsController.fetchProductByName);

router.post('/product', productsController.addProduct);

router.put('/product/:pId', productsController.updateProduct);

router.delete('/product/:pId', productsController.deleteProduct);

module.exports = router;