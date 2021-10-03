const express = require("express");
const { body } = require("express-validator");
const Buyer = require("../models/Buyer");

const buyerController = require("../controllers/buyer");

const router = express.Router();

router.post(
    "/buyer/signup",
    [
        body("name").trim().isString().isLength({ min: 3, max: 8 }),
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email.")
            .normalizeEmail()
            .custom((value, { req }) => {
                return Buyer.findOne({ email: value }).then((userDoc) => {
                    if (userDoc) {
                        return Promise.reject("E-mail address already exists.");
                    }
                });
            }),
        body("password").trim().isLength({ min: 6 }),
    ],
    buyerController.signupBuyer
);

router.post("/buyer/login", buyerController.loginBuyer);

/*==========  Admin operation ==========*/

router.get("/buyer/a", buyerController.fetchAllBuyers);

router.post("/buyer/a/email", buyerController.fetchBuyerByEmail);

router.get("/buyer/a/:bId", buyerController.fetchBuyerById);

router.delete("/buyer/a/:bId", buyerController.deleteBuyerByAdmin);

module.exports = router;
