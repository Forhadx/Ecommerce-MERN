const OrdersModel = require("../models/Orders");
const BuyerModel = require("../models/Buyer");

/*==============        update order by admin      =============== */

exports.onWayOrder = async (req, res, next) => {
    const oId = req.params.oId;
    try {
        let order = await OrdersModel.findById(oId);
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
    const oId = req.params.oId;
    try {
        let order = await OrdersModel.findById(oId);
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

exports.deliveredOrder = async (req, res, next) => {
    const oId = req.params.oId;
    try {
        let order = await OrdersModel.findById(oId);
        if (!order) {
            console.log("order not found!");
        }
        order.isDelivered = true;
        order.deliveredAt = new Date();
        const buyer = await BuyerModel.findById(order.buyerId);
        buyer.totalbuy = buyer.totalbuy + order.totalPrice;
        await order.save();
        res.json({ message: "order is visited!", order: order });
    } catch (err) {
        console.log(err);
    }
};

/*==============        fetch order by admin      =============== */

exports.fetchAllOrders = async (req, res, next) => {
    try {
        const orders = await OrdersModel.find()
            .populate("items.productId", "image name price")
            .sort({
                updatedAt: -1,
            });
        if (!orders) {
            console.log("orders not found!");
        }
        let updateOrders = orders.map((or) => {
            let updateItems = or.items.map((i) => {
                return { ...i.productId._doc, quantity: i.quantity };
            });
            return { ...or._doc, items: updateItems };
        });
        res.json({
            message: "all orders fetch",
            orders: updateOrders,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.fetchOrderByUserEmail = async (req, res, next) => {
    const { email } = req.body;
    console.log("e", email);
    try {
        const buyer = await BuyerModel.findOne({ email: email });
        if (!buyer) {
            console.log("email not found");
        }
        const orders = await OrdersModel.find({ buyerId: buyer._id }).sort({
            createdAt: -1,
        });
        if (!orders) {
            console.log("orders not found");
        }
        res.json({ message: "fetch orders by buyer email", orders: orders });
    } catch (err) {
        console.log(err);
    }
};

exports.fetchOnWayOrders = async (req, res, next) => {
    try {
        const orders = await OrdersModel.find({ onWay: true }).sort({
            onWayAt: -1,
        });
        if (!orders) {
            console.log("order not found");
        }
        res.json({ message: "fetch all on way orders", orders: orders });
    } catch (err) {
        console.log(err);
    }
};

exports.fetchDeliveredOrders = async (req, res, next) => {
    try {
        const orders = await OrdersModel.find({ isDelivered: true }).sort({
            deliveredAt: -1,
        });
        if (!orders) {
            console.log("order not found");
        }
        res.json({ message: "fetch all on delivered orders", orders: orders });
    } catch (err) {
        console.log(err);
    }
};

exports.fetchRejectedOrders = async (req, res, next) => {
    try {
        const orders = await OrdersModel.find({ orderRejected: true }).sort({
            updatedAt: -1,
        });
        if (!orders) {
            console.log("order not found");
        }
        res.json({ message: "fetch all on rejected orders", orders: orders });
    } catch (err) {
        console.log(err);
    }
};
