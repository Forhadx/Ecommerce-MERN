const CategoriesModel = require("../models/categories");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await CategoriesModel.find();
    if (!categories) {
      console.log("not found");
    }
    res.json({ message: "Fetch all categories", categories: categories });
  } catch (err) {
    console.log(err);
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    const category = new CategoriesModel(req.body);
    await category.save();
    res.json({ message: "category add successfully.", category: category });
  } catch (err) {
    console.log(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  const cId = req.params.cId;
  try {
    let category = await CategoriesModel.findOneAndUpdate(
      cId,
      req.body,
      (err, doc) => {
        if (err) {
          console.log(err);
        }
        return doc;
      }
    );
    if (!category) {
      console.log("not found!");
    }
    res.json({ message: "updated category sucessfully.", category: category });
  } catch (err) {
    console.log(err);
  }
};


exports.deleteCategory = async (req,res,next)=>{
  const cId = req.params.cId;
  try{
    let category = await CategoriesModel.findByIdAndDelete(cId);
    if(!category){
      console.log('id not found!')
    }
    res.json({message: 'category delete successfully'})
  }catch(err){
    console.log(err)
  }
}