const express = require('express');

const ordersController = require('../controllers/orders');

const router = express.Router();

router.post('/order', ordersController.addOrder);

module.exports = router;