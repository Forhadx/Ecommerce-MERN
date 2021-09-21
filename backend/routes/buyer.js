const express = require("express");
//const { body } = require("express-validator");

const buyerController = require("../controllers/buyer");

const router = express.Router();

router.post("/buyer/signup", buyerController.signupBuyer);

router.post("/buyer/login", buyerController.loginBuyer);

/*==========  Admin operation ==========*/

router.get("/buyer/a", buyerController.fetchAllBuyers);

router.get("/buyer/a/email", buyerController.fetchBuyerByEmail);

router.get("/buyer/a/:bId", buyerController.fetchBuyerById);

router.delete("/buyer/a/:bId", buyerController.deleteBuyerByAdmin);

module.exports = router;
