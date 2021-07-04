const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    items: [
      {
        productId: {
          type: ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },/*
    buyer: {
      type: ObjectId,
      ref: "buyer",
    },*/
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    onWay: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    orderRejected:{
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
