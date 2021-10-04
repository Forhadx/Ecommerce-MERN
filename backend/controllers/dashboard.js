const OrdersModel = require("../models/Orders");
const BuyerModel = require("../models/Buyer");
const ProductModel = require("../models/products");

exports.fetchAllDetails = async (req, res, next) => {
    try {
        const totalProducts = await ProductModel.find().countDocuments();
        if (!totalProducts) {
            const error = new Error("Invalid products!");
            error.statusCode = 401;
            throw error;
        }
        const totalBuyers = await BuyerModel.find().countDocuments();
        if (!totalBuyers) {
            const error = new Error("Invalid buyers!");
            error.statusCode = 401;
            throw error;
        }
        const totalOrders = await OrdersModel.find().countDocuments();
        if (!totalOrders) {
            const error = new Error("Invalid orders!");
            error.statusCode = 401;
            throw error;
        }
        const orders = await OrdersModel.find();
        if (!orders) {
            const error = new Error("Invalid orders!");
            error.statusCode = 401;
            throw error;
        }
        let revenue = 0;
        for (let el of orders) {
            revenue += el.totalPrice;
        }
        res.json({
            message: "all details fetch successfully!",
            totalProducts: totalProducts,
            totalBuyers: totalBuyers,
            totalOrders: totalOrders,
            revenue: revenue,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
