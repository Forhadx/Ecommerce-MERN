const express = require("express");

const productsController = require("../controllers/products");
const fileUpload = require("../middleware/imageUrl");

const router = express.Router();

router.post(
    "/product",
    fileUpload.single("image"),
    productsController.addProduct
);

router.patch(
    "/product/:pId",
    fileUpload.single("image"),
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

router.post("/products/subCategory", productsController.fetchProductByCategory);

module.exports = router;
