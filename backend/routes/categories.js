
const express = require('express');

const categoriesController = require('../controllers/categories');

const router = express.Router();

router.get('/category', categoriesController.getCategories);

router.post('/category', categoriesController.addCategory);

router.put('/category/:cId', categoriesController.updateCategory);

router.delete('/category/:cId', categoriesController.deleteCategory);

module.exports = router;