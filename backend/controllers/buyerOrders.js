const OrdersModel = require("../models/Orders");
const ProductModel = require("../models/products");

exports.addOrder = async (req, res, next) => {
  req.buyerId = "60e76b2fb4d3332c28e56e73";
  //const { items, totalPrice, buyerId, phone, address } = req.body;
  try {
    if (req.buyerId !== req.body.buyerId) {
      console.log("buyer id not match!");
    }
    let order = new OrdersModel(req.body);
    if (!order) {
      console.log("order not added!");
    }
    await order.save();
    res.json({ message: "order added", order: order });
    
  } catch (err) {
    console.log(err);
  }
};

exports.fetchAllorders = async (req, res, next) => {
  req.buyerId = "60e2367d18837e2c9019876e";
  try {
    let orders = await OrdersModel.find({ buyerId: req.buyerId }).sort({
      updatedAt: -1,
    });
    if (!orders) {
      console.log("orders not found!");
    }
    res.json({ message: "fetch all buyer orders", orders: orders });
  } catch (err) {
    console.log(err);
  }
};

exports.fetchOnWayOrders = async (req, res, next) => {
  req.buyerId = "60e2367d18837e2c9019876e";
  try {
    let orders = await OrdersModel.find({ buyerId: req.buyerId, onWay: true });
    if (!orders) {
      console.log("orders not found!");
    }
    res.json({ message: "fetch onway buyers orders", orders: orders });
  } catch (err) {
    console.log(err);
  }
};

exports.fetchDeliveredOrders = async (req, res, next) => {
  req.buyerId = "60e2367d18837e2c9019876e";
  try {
    let orders = await OrdersModel.find({
      buyerId: req.buyerId,
      isDelivered: true,
    }).sort({ deliveredAt: -1 });
    if (!orders) {
      console.log("orders not found!");
    }
    res.json({ message: "fetch delivered buyers orders", orders: orders });
  } catch (err) {
    console.log(err);
  }
};

exports.fetchRejectedOrders = async (req, res, next) => {
  req.buyerId = "60e2367d18837e2c9019876e";
  try {
    let orders = await OrdersModel.find({
      buyerId: req.buyerId,
      orderRejected: true,
    }).sort({ updatedAt: -1 });
    if (!orders) {
      console.log("orders not found!");
    }
    res.json({ message: "fetch rejected buyers orders", orders: orders });
  } catch (err) {
    console.log(err);
  }
};
