const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    mainCategory: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    dpImage: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("categories", categoriesSchema);
