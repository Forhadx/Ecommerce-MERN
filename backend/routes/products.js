const express = require("express");
const { body, check } = require("express-validator");

const productsController = require("../controllers/products");
const fileUpload = require("../middleware/imageUrl");

const router = express.Router();

router.post(
    "/product",
    fileUpload.single("image"),
    [
        body("mainCategory").notEmpty(),
        body("subCategory").notEmpty(),
        body("name", "product name should be between 3 to 60 character.")
            .trim()
            .isString()
            .isLength({ min: 3, max: 60 }),
        body("amount", "product amount should be max 20 character.")
            .trim()
            .isString()
            .isLength({ max: 20 }),
        body("price", "product price should be between 10 to 2000 tk.").isFloat(
            { min: 10, max: 2000 }
        ),
        body("brand", "product brand should be max 50 character.")
            .trim()
            .isString()
            .isLength({ max: 50 }),
        body("description", "product description should be max 500 character.")
            .trim()
            .isString()
            .isLength({ max: 500 }),
    ],
    productsController.addProduct
);

router.patch(
    "/product/:pId",
    fileUpload.single("image"),
    [
        body("mainCategory").notEmpty(),
        body("subCategory").notEmpty(),
        body("name", "product name should be between 3 to 60 character.")
            .trim()
            .isString()
            .isLength({ min: 3, max: 60 }),
        body("amount", "product amount should be max 20 character.")
            .trim()
            .isString()
            .isLength({ max: 20 }),
        body("price", "product price should be between 10 to 2000 tk.").isFloat(
            { min: 10, max: 2000 }
        ),
        body("brand", "product brand should be max 50 character.")
            .trim()
            .isString()
            .isLength({ max: 50 }),
        body("description", "product description should be max 500 character.")
            .trim()
            .isString()
            .isLength({ max: 500 }),
    ],
    productsController.updateProduct
);

router.delete("/product/:pId", productsController.deleteProduct);

router.get("/products", productsController.getAllProducts);

router.get("/product/id/:pId", productsController.fetchProductById);

router.get("/product/name/:pName", productsController.fetchProductByName);

router.post(
    "/products/mainCategory",
    productsController.fetchProductByMainCategory
);

router.post(
    "/products/subCategory",
    productsController.fetchProductBySubCategory
);

module.exports = router;

/*
 [
        body("mainCategory").notEmpty(),
        body("subCategory").notEmpty(),
        body("name", "product name should be between 3 to 60 character.")
            .trim()
            .isString()
            .isLength({ min: 3, max: 60 }),
        body("amount", "product amount should be max 20 character.")
            .trim()
            .isString()
            .isLength({ max: 20 }),
        body("price").isNumeric().isLength({ min: 10, max: 2000 }),
        body("brand", "product brand should be max 50 character.")
            .trim()
            .isString()
            .isLength({ max: 50 }),
        body("description", "product description should be max 500 character.")
            .trim()
            .isString()
            .isLength({ max: 500 }),
    ]
*/
