const express = require('express');

const ordersController = require('../controllers/buyerOrders');

const router = express.Router();

router.post('/order/b', ordersController.addOrder);

router.get('/order/b/allorders', ordersController.fetchAllorders);

router.get('/order/b/onway', ordersController.fetchOnWayOrders);

router.get('/order/b/delivered', ordersController.fetchDeliveredOrders);

router.get('/order/b/rejected', ordersController.fetchRejectedOrders);

module.exports = router;