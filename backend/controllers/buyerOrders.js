const OrdersModel = require("../models/Orders");
const ProductModel = require("../models/products");

exports.addOrder = async (req, res, next) => {
    //const { items, totalPrice, buyerId, phone, address } = req.body;
    //console.log("or: ", req.body);
    try {
        if (req.userId !== req.body.buyerId) {
            const error = new Error("buyer id not match!");
            error.statusCode = 401;
            throw error;
        }
        let order = new OrdersModel(req.body);
        if (!order) {
            const error = new Error("order not added!");
            error.statusCode = 401;
            throw error;
        }
        await order.save();
        res.json({ message: "order added", order: order });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchAllorders = async (req, res, next) => {
    try {
        let orders = await OrdersModel.find({ buyerId: req.userId })
            .populate("items.productId", "image name price")
            .sort({
                updatedAt: -1,
            });
        if (!orders) {
            const error = new Error("order not found!");
            error.statusCode = 401;
            throw error;
        }
        let updateOrders = orders.map((or) => {
            let updateItems = or.items.map((i) => {
                return { ...i.productId._doc, quantity: i.quantity };
            });
            return { ...or._doc, items: updateItems };
        });
        res.json({ message: "fetch all buyer orders", orders: updateOrders });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
/*
exports.fetchOnWayOrders = async (req, res, next) => {
    req.buyerId = "60e76adcb4d3332c28e56e71";
    try {
        let orders = await OrdersModel.find({
            buyerId: req.buyerId,
            onWay: true,
        });
        if (!orders) {
            const error = new Error("order not found!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ message: "fetch onway buyers orders", orders: orders });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchDeliveredOrders = async (req, res, next) => {
    req.buyerId = "60e76adcb4d3332c28e56e71";
    try {
        let orders = await OrdersModel.find({
            buyerId: req.buyerId,
            isDelivered: true,
        }).sort({ deliveredAt: -1 });
        if (!orders) {
            const error = new Error("order not found!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ message: "fetch delivered buyers orders", orders: orders });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchRejectedOrders = async (req, res, next) => {
    req.buyerId = "60e76adcb4d3332c28e56e71";
    try {
        let orders = await OrdersModel.find({
            buyerId: req.buyerId,
            orderRejected: true,
        }).sort({ updatedAt: -1 });
        if (!orders) {
            const error = new Error("order not found!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ message: "fetch rejected buyers orders", orders: orders });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
*/
