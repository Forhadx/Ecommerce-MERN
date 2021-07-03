
const express = require('express');

const categoriesController = require('../controllers/categories');

const router = express.Router();

router.get('/category', categoriesController.getSelectedCategories);

router.get('/category/:id', categoriesController.getSingleCategory);

router.post('/category', categoriesController.addCategories);

module.exports = router;