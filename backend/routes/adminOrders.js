const express = require("express");

const ordersController = require("../controllers/adminOrders");

const router = express.Router();

/*==============    update order by admin   =============== */

router.patch("/order/a/onway/:oId", ordersController.onWayOrder);

router.patch("/order/a/rejected/:oId", ordersController.rejectOrder);

router.patch("/order/a/delivered/:oId", ordersController.deliveredOrder);

/*==============    fetch order by admin    =============== */

//http://localhost:5000/order/a/allorders?page=2
router.get("/order/a/allorders", ordersController.fetchAllOrders);

router.get("/order/a/bemail/allorder", ordersController.fetchOrderByUserEmail);

router.get("/order/a/onway", ordersController.fetchOnWayOrders);

router.get("/order/a/delivered", ordersController.fetchDeliveredOrders);

router.get("/order/a/rejected", ordersController.fetchRejectedOrders);

module.exports = router;
