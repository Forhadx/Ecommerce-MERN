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
    try {
        const product = new ProductModel(req.body);
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
    const pId = req.params.pId;
    console.log("id: ", pId);
    console.log("data: ", req.body);
    const {
        mainCategory,
        subCategory,
        name,
        image,
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
        product.mainCategory = mainCategory;
        product.subCategory = subCategory;
        product.name = name;
        product.image = image;
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
    // console.log("pId: ", pId);
    try {
        let product = await ProductModel.findByIdAndDelete(pId);
        if (!product) {
            console.log("product not found!");
        }
        res.json({ message: "product delete successfully." });
    } catch (err) {
        console.log(err);
    }
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
    let pSubCategory = req.params.pSubCategory;
    try {
        const products = await ProductModel.find({
            subCategory: pSubCategory,
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
