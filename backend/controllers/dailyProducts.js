const DailyproductsModel = require("../models/dailyProducts");

/*  this code not needed
exports.postDailyProducts = async (req, res, next) => {
  try {
    const dailyProd = new DailyproductsModel(req.body);
    const result = dailyProd.save();
    res.json({ message: "post!!", result: result });
  } catch (err) {
    console.log(err);
  }
};

  //INPUT
{
    "products":[{"productId": "60fb3bb32227ec1ae00022ad"},{"productId": "60fb3c022227ec1ae00022af"}]
}

*/

exports.getAllDailyProducts = async (req, res, next) => {
  try {
    let dailyProd = await DailyproductsModel.find().populate(
      "products.productId"
    );
    const products = dailyProd[0].products.map((p) => {
      return p.productId;
    });
    let details = {
      _id: dailyProd[0]._id,
      name: dailyProd[0].name,
      description: dailyProd[0].description,
      image: dailyProd[0].image,
    };
    res.json({
      message: "get all daily products!",
      products: products,
      details: { ...details },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateDailyProducts = async (req, res, next) => {
  const pId = "6106d5996601de32800d6060";
  try {
    let prods = await DailyproductsModel.findById(pId);
    prods.name = req.body.name;
    prods.description = req.body.description;
    prods.image = req.body.image;
    prods.products = req.body.products;
    prods.save();
    res.json({ message: "updated!" });
  } catch (err) {
    console.log(err);
  }
};
