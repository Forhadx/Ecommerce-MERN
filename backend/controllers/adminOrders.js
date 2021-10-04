const OrdersModel = require("../models/Orders");
const BuyerModel = require("../models/Buyer");

/*==============        update order by admin      =============== */

exports.onWayOrder = async (req, res, next) => {
    const oId = req.params.oId;
    try {
        let order = await OrdersModel.findById(oId);
        if (!order) {
            const error = new Error("Invalid Order!");
            error.statusCode = 401;
            throw error;
        }
        order.onWay = true;
        order.onWayAt = new Date();
        await order.save();
        res.json({ message: "order is onWay", order: order });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.rejectOrder = async (req, res, next) => {
    const oId = req.params.oId;
    try {
        let order = await OrdersModel.findById(oId);
        if (!order) {
            const error = new Error("Invalid Order!");
            error.statusCode = 401;
            throw error;
        }
        order.orderRejected = true;
        await order.save();
        res.json({ message: "order is rejected!", order: order });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deliveredOrder = async (req, res, next) => {
    const oId = req.params.oId;
    try {
        let order = await OrdersModel.findById(oId);
        if (!order) {
            const error = new Error("Invalid Order!");
            error.statusCode = 401;
            throw error;
        }
        order.isDelivered = true;
        order.deliveredAt = new Date();
        const buyer = await BuyerModel.findById(order.buyerId);
        buyer.totalbuy = buyer.totalbuy + order.totalPrice;
        await order.save();
        res.json({ message: "order is visited!", order: order });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
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
            const error = new Error("Invalid Order!");
            error.statusCode = 401;
            throw error;
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
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchOrderById = async (req, res, next) => {
    const oid = req.params.oid;
    console.log("id: ", oid);
    try {
        const orders = await OrdersModel.find({
            _id: oid,
        })
            .populate("items.productId", "image name price")
            .sort({
                createdAt: -1,
            });
        if (!orders) {
            const error = new Error("Invalid Order!");
            error.statusCode = 401;
            throw error;
        }
        let updateOrders = orders.map((or) => {
            let updateItems = or.items.map((i) => {
                return { ...i.productId._doc, quantity: i.quantity };
            });
            return { ...or._doc, items: updateItems };
        });
        res.json({ message: "fetch orders id", orders: updateOrders });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchNewOrders = async (req, res, next) => {
    try {
        const orders = await OrdersModel.find({
            onWay: false,
            isDelivered: false,
            orderRejected: false,
        })
            .populate("items.productId", "image name price")
            .sort({
                createdAt: -1,
            });
        if (!orders) {
            const error = new Error("Invalid Order!");
            error.statusCode = 401;
            throw error;
        }
        let updateOrders = orders.map((or) => {
            let updateItems = or.items.map((i) => {
                return { ...i.productId._doc, quantity: i.quantity };
            });
            return { ...or._doc, items: updateItems };
        });
        res.json({ message: "fetch all new orders", orders: updateOrders });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchOnWayOrders = async (req, res, next) => {
    try {
        const orders = await OrdersModel.find({
            onWay: true,
            isDelivered: false,
        })
            .populate("items.productId", "image name price")
            .sort({
                onWayAt: -1,
            });
        if (!orders) {
            const error = new Error("Invalid Order!");
            error.statusCode = 401;
            throw error;
        }
        let updateOrders = orders.map((or) => {
            let updateItems = or.items.map((i) => {
                return { ...i.productId._doc, quantity: i.quantity };
            });
            return { ...or._doc, items: updateItems };
        });
        res.json({ message: "fetch all on way orders", orders: updateOrders });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchDeliveredOrders = async (req, res, next) => {
    try {
        const orders = await OrdersModel.find({ isDelivered: true })
            .populate("items.productId", "image name price")
            .sort({
                deliveredAt: -1,
            });
        if (!orders) {
            const error = new Error("Invalid Order!");
            error.statusCode = 401;
            throw error;
        }
        let updateOrders = orders.map((or) => {
            let updateItems = or.items.map((i) => {
                return { ...i.productId._doc, quantity: i.quantity };
            });
            return { ...or._doc, items: updateItems };
        });
        res.json({
            message: "fetch all on delivered orders",
            orders: updateOrders,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchRejectedOrders = async (req, res, next) => {
    try {
        const orders = await OrdersModel.find({ orderRejected: true })
            .populate("items.productId", "image name price")
            .sort({
                updatedAt: -1,
            });
        if (!orders) {
            const error = new Error("Invalid Order!");
            error.statusCode = 401;
            throw error;
        }
        let updateOrders = orders.map((or) => {
            let updateItems = or.items.map((i) => {
                return { ...i.productId._doc, quantity: i.quantity };
            });
            return { ...or._doc, items: updateItems };
        });
        res.json({
            message: "fetch all on rejected orders",
            orders: updateOrders,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
