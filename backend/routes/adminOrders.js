const express = require("express");

const ordersController = require("../controllers/adminOrders");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

/*==============    update order by admin   =============== */

router.get("/order/a/onway/:oId", isAuth, ordersController.onWayOrder);

router.get("/order/a/rejected/:oId", isAuth, ordersController.rejectOrder);

router.get("/order/a/delivered/:oId", isAuth, ordersController.deliveredOrder);

/*==============    fetch order by admin    =============== */

//http://localhost:5000/order/a/allorders?page=2
router.get("/order/a/allorders", isAuth, ordersController.fetchAllOrders);

router.get("/order/a/new", isAuth, ordersController.fetchNewOrders);

router.get("/order/a/onway", isAuth, ordersController.fetchOnWayOrders);

router.get("/order/a/delivered", isAuth, ordersController.fetchDeliveredOrders);

router.get("/order/a/rejected", isAuth, ordersController.fetchRejectedOrders);

router.get("/order/a/:oid", isAuth, ordersController.fetchOrderById);

module.exports = router;
