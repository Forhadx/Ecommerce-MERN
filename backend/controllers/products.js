const Products = require("../models/products");

exports.addProducts = (req, res, next) => {
  const { name, price } = req.body;

  const products = new Products({
    name: name,
    price: price,
  });

  products
    .save()
    .then((result) => {
        res.json({message: 'added..', products: result})
      console.log("added..", result);
    })
    .catch((err) => console.log("err"));
};
