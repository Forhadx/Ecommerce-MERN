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
    receiver: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    buyerId: {
      type: ObjectId,
      ref: "buyer",
      required: true,
    },
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
    onWayAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    orderRejected: {
      type: Boolean,
      default: false,
    },
    isVisited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
