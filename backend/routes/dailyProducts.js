const express = require("express");

const dailyProductsController = require("../controllers/dailyProducts");

const router = express.Router();

/// router.post("/daily", dailyProductsController.postDailyProducts);   // not needed

router.get("/daily-products", dailyProductsController.getAllDailyProducts);

router.put("/daily-products", dailyProductsController.updateDailyProducts);

module.exports = router;
