const path = require("path");
const fs = require("fs");

const ProductModel = require("../models/products");

exports.getAllProducts = async (req, res, next) => {
    try {
        let products = await ProductModel.find();
        res.json({ message: "all products", products: products });
    } catch (err) {
        console.log(err);
    }
};

exports.addProduct = async (req, res, next) => {
    //console.log("data: ", req.body);
    // console.log("data: ", req.file);
    let imagePath = "";
    try {
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
            console.log("file not found");
        }
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
        if (!product) {
            console.log("product could not added!");
        }
        await product.save();
        res.json({
            message: "added a product successfully.",
            product: product,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    // console.log("update?");
    // console.log("data: ", req.body);
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
        /*
        let product = await ProductModel.findOneAndUpdate(
            pId,
            req.body,
            (err, doc) => {
                if (err) {
                    console.log("error while update", err);
                }
                return doc;
            }
        );*/
        let product = await ProductModel.findById(pId);
        if (!product) {
            console.log("product not found!");
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

        //console.log("update: ", product);
        res.json({
            message: " updated product successfully.",
            product: product,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    const pId = req.params.pId;
    console.log("dpId: ", pId);
    try {
        let product = await ProductModel.findById(pId);
        if (!product) {
            console.log("product not found!");
        }
        console.log("delete: ", product.image);
        clearImage(product.image);
        await ProductModel.findByIdAndDelete(pId);
        res.json({ message: "product delete successfully." });
    } catch (err) {
        console.log(err);
    }
    /*
    ProductModel.findById(pId).then((prod) => {
        console.log("d: ", prod.image);
    });*/
};

exports.fetchProductById = async (req, res, next) => {
    const pId = req.params.pId;
    try {
        let product = await ProductModel.findById(pId);
        if (!product) {
            console.log("product not found!");
        }
        res.json({ message: "product fetch by id", product: product });
    } catch (err) {
        console.log(err);
    }
};

exports.fetchProductByName = async (req, res, next) => {
    const name = req.params.pName;
    console.log("name: ", name);
    try {
        let products = await ProductModel.find({ name: name });
        //console.log('product: ', products)
        res.json({ message: "product fetch by name", products: products });
    } catch (err) {
        console.log(err);
    }
};

exports.fetchProductByCategory = async (req, res, next) => {
    let subCatName = req.body.subCatName;

    try {
        const products = await ProductModel.find({
            subCategory: subCatName,
        });

        res.json({
            message: "page...",
            products: products,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.fetchProductByMainCategory = async (req, res, next) => {
    let mainCatName = req.body.mainCatName;

    try {
        const products = await ProductModel.find({
            mainCategory: mainCatName,
        });

        res.json({
            message: `fetch all main:- ${mainCatName} products`,
            products: products,
        });
    } catch (err) {
        console.log(err);
    }
};

const clearImage = (ImgPath) => {
    console.log("p: ", ImgPath);
    ImgPath = path.join(__dirname, "..", ImgPath);
    fs.unlink(ImgPath, (err) => {
        console.log("delete done! ", err);
    });
};
