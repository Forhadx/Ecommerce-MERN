const express = require("express");

const dashboardControlller = require("../controllers/dashboard");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/dashboard", isAuth, dashboardControlller.fetchAllDetails);

module.exports = router;
