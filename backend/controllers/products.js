const path = require("path");
const fs = require("fs");

const { validationResult } = require("express-validator");

const ProductModel = require("../models/products");

exports.getAllProducts = async (req, res, next) => {
    try {
        let products = await ProductModel.find();
        res.json({ message: "all products", products: products });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addProduct = async (req, res, next) => {
    //console.log(req.body);
    try {
        const errors = validationResult(req);
        //console.log("val err? ", errors.array());
        if (!errors.isEmpty()) {
            const error = new Error();
            error.message = errors.array()[0].msg;
            error.statusCode = 422;
            throw error;
        }
        const {
            mainCategory,
            subCategory,
            name,
            price,
            amount,
            brand,
            description,
        } = req.body;
        if (!req.file) {
            const error = new Error("No image provided!");
            error.statusCode = 422;
            throw error;
        }
        let imagePath = "";
        imagePath = req.file.path.replace(/\\/g, "/");
        const product = new ProductModel({
            mainCategory: mainCategory,
            subCategory: subCategory,
            name: name,
            price: price,
            amount: amount,
            brand: brand,
            description: description,
            image: imagePath,
        });
        await product.save();
        res.json({
            message: "added a product successfully.",
            product: product,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    const pId = req.params.pId;
    const {
        mainCategory,
        subCategory,
        name,
        price,
        amount,
        brand,
        description,
    } = req.body;
    try {
        const errors = validationResult(req);
        //console.log("val err? ", errors.array());
        if (!errors.isEmpty()) {
            const error = new Error();
            error.message = errors.array()[0].msg;
            error.statusCode = 422;
            throw error;
        }
        let product = await ProductModel.findById(pId);
        if (!product) {
            const error = new Error("Invalid product id!");
            error.statusCode = 401;
            throw error;
        }
        let imageUrl = req.body.image;
        if (req.file) {
            clearImage(product.image);
            imageUrl = req.file.path.replace(/\\/g, "/");
        }
        product.mainCategory = mainCategory;
        product.subCategory = subCategory;
        product.name = name;
        product.image = imageUrl;
        product.price = price;
        product.amount = amount;
        product.brand = brand;
        product.description = description;
        await product.save();
        res.json({
            message: " updated product successfully.",
            product: product,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    const pId = req.params.pId;
    try {
        let product = await ProductModel.findById(pId);
        if (!product) {
            const error = new Error("Invalid product id!");
            error.statusCode = 401;
            throw error;
        }
        clearImage(product.image);
        await ProductModel.findByIdAndDelete(pId);
        res.json({ message: "product delete successfully." });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchProductById = async (req, res, next) => {
    const pId = req.params.pId;
    try {
        let product = await ProductModel.findById(pId);
        if (!product) {
            const error = new Error("Invalid product id!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ message: "product fetch by id", product: product });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchProductByName = async (req, res, next) => {
    const name = req.params.pName;
    try {
        let products = await ProductModel.find({ name: name });
        if (!products) {
            const error = new Error("Invalid product name!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ message: "product fetch by name", products: products });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchProductBySubCategory = async (req, res, next) => {
    let subCatName = req.body.subCatName;
    try {
        const products = await ProductModel.find({
            subCategory: subCatName,
        });
        if (!products) {
            const error = new Error("Invalid sub category name!");
            error.statusCode = 401;
            throw error;
        }
        res.json({
            message: "page...",
            products: products,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchProductByMainCategory = async (req, res, next) => {
    let mainCatName = req.body.mainCatName;

    try {
        const products = await ProductModel.find({
            mainCategory: mainCatName,
        });
        if (!products) {
            const error = new Error("Invalid Main category name!");
            error.statusCode = 401;
            throw error;
        }
        res.json({
            message: `fetch all main:- ${mainCatName} products`,
            products: products,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const clearImage = (ImgPath) => {
    ImgPath = path.join(__dirname, "..", ImgPath);
    fs.unlink(ImgPath, (err) => {
        //console.log("delete done! ", err);
    });
};
