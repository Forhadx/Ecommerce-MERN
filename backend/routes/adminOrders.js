const express = require('express');

const ordersController = require('../controllers/adminOrders');

const router = express.Router();


/*==============    update order by admin   =============== */

router.patch('/order/a/onway/:pId', ordersController.onWayOrder);

router.patch('/order/a/reject/:pId', ordersController.rejectOrder);

router.patch('/order/a/visit/:pId', ordersController.visitedOrder);

router.patch('/order/a/delivered/:pId', ordersController.deliveredOrder);


/*==============    fetch order by admin    =============== */


module.exports = router;