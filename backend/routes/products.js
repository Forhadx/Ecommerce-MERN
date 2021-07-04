
const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/product', productsController.getAllProducts);

router.get('/product/id/:pId', productsController.fetchProductById);

router.get('/product/name/:pName', productsController.fetchProductByName);

//http://localhost:5000/product/subCategory/men?page=11
router.get('/product/subCategory/:pSubCategory', productsController.fetchProductByCategory);

router.post('/product', productsController.addProduct);

router.put('/product/:pId', productsController.updateProduct);

router.delete('/product/:pId', productsController.deleteProduct);

module.exports = router;