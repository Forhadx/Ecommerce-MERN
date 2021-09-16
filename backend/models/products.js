const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
        mainCategory: {
            type: String,
            required: true,
        },
        subCategory: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
