const OrdersModel = require("../models/Orders");
const ProductModel = require("../models/products");


/*==============        update order by admin      =============== */

exports.onWayOrder = async (req, res, next) => {
  const pId = req.params.pId;
  try {
    let order = await OrdersModel.findById(pId);
    if (!order) {
      console.log("order not found!");
    }
    order.onWay = true;
    order.onWayAt = new Date();
    await order.save();
    res.json({ message: "order is onWay", order: order });
  } catch (err) {
    console.log(err);
  }
};


exports.rejectOrder = async (req, res, next) => {
  const pId = req.params.pId;
  try {
    let order = await OrdersModel.findById(pId);
    if (!order) {
      console.log("order not found!");
    }
    order.orderRejected = true;
    await order.save();
    res.json({ message: "order is rejected!", order: order });
  } catch (err) {
    console.log(err);
  }
};



exports.visitedOrder = async (req, res, next) => {
  const pId = req.params.pId;
  try {
    let order = await OrdersModel.findById(pId);
    if (!order) {
      console.log("order not found!");
    }
    order.isVisited = true;
    await order.save();
    res.json({ message: "order is visited!", order: order });
  } catch (err) {
    console.log(err);
  }
};



exports.deliveredOrder = async (req, res, next) => {
  const pId = req.params.pId;
  try {
    let order = await OrdersModel.findById(pId);
    if (!order) {
      console.log("order not found!");
    }
    order.isDelivered = true;
    order.deliveredAt = new Date();
    await order.save();
    res.json({ message: "order is visited!", order: order });
  } catch (err) {
    console.log(err);
  }
};




/*==============        fetch order by admin      =============== */


exports.fetchBuyerOrder  = async (req, res, next)=>{
    
}