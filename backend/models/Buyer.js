const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const buyerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: String,
    resetTokenExpiration: Date,
    currentOrder: {
      type: Array,
      default: [],
    },
    orderHistory:{
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model('buyer', buyerSchema); 