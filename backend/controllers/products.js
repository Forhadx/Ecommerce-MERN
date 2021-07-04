const ProductModel = require("../models/products");

exports.getAllProducts = async (req, res, next) => {
  try {
    let products = await Products.find();
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
    res.json({ message: "added a product successfully.", product: product });
  } catch (err) {
    console.log(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const pId = req.params.pId;

  try {
    let product = await ProductModel.findOneAndUpdate(
      pId,
      req.body,
      (err, doc) => {
        if (err) {
          console.log("error while update", err);
        }
        return doc;
      }
    );
    if (!product) {
      console.log("product not found!");
    }
    //console.log("update: ", product);
    res.json({ message: " updated product successfully.", product: product });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const pId = req.params.pId;
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
  const currentPage = req.query.page || 1;
  const perPage = 1;
  try {
    const totalProducts = await ProductModel.find({
      subCategory: pSubCategory,
    }).countDocuments();
    const products = await ProductModel.find({
      subCategory: pSubCategory,
    })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.json({
      message: "page...",
      products: products,
      totalProducts: totalProducts,
    });
  } catch (err) {
    console.log(err);
  }
};
