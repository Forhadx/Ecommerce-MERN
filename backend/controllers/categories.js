const Categories = require("../models/categories");

exports.getSelectedCategories = async (req, res, next) => {
  let result = await Categories.find()
    .populate({
      path: "allProducts.productId",
      match: { price: { $gte: 110 } },
      select: "name price -_id",
    })
    .exec();
  //console.log("category: ", result);
  res.json({ message: "category populated..", products: { ...result } });
};

exports.getSingleCategory = async (req, res, next) => {
  let doc = await Categories.findById(req.params.id)
    //.populate("allProducts.productId", "name price")
    .populate({
      path: "allProducts.productId",
     // match: { price: { $gte: 110 } },
      //select: "name price",
       perDocumentLimit: 2
    });

  /*
  const products = doc.allProducts.map(i =>{
    return {...i.productId._doc}
  })

  console.log('all product: ', products)

  res.json({ message: "single category..", products: products });
  */

  const p = doc.allProducts.map((i) => {
    if (i.productId !== null ) {
      return { ...i.productId._doc };
    }
  });

  let products = p.filter(Boolean)

  console.log('p: ', products)

  res.json({ message: "single category..", products: products });
};

exports.addCategories = (req, res, next) => {
  const { name, description } = req.body;

  const categories = new Categories({
    name: name,
    description: description,
  });

  categories
    .save()
    .then((result) => {
      res.json({ message: "added..", categories: result });
      console.log("added..", result);
    })
    .catch((err) => console.log("err"));
};
