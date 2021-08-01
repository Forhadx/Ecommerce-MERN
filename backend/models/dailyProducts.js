const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;

const dailyProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: ObjectId,
          ref: "products",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("dailyproducts", dailyProductsSchema);
