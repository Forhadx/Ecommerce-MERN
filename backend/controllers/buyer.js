const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");
const BuyerModel = require("../models/Buyer");

exports.signupBuyer = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error();
            error.message = errors.array()[0].msg;
            error.statusCode = 422;
            throw error;
        }
        const hashPw = await bcrypt.hash(password, 12);
        const user = new BuyerModel({
            name: name,
            email: email,
            password: hashPw,
        });
        await user.save();
        if (!user) {
            const error = new Error("couldn't added the user!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ message: "Buyer created!", userId: user._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.loginBuyer = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const buyer = await BuyerModel.findOne({ email: email });
        if (!buyer) {
            const error = new Error("Invalid Buyer!");
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, buyer.password);
        if (!isEqual) {
            throw new Error("wrong password.");
        }
        const token = jwt.sign(
            {
                email: buyer.email,
                userId: buyer._id.toString(),
            },
            process.env.JWT_TOKEN,
            { expiresIn: "365d" }
        );
        res.json({
            message: "login successfully",
            email: buyer.email,
            user: buyer.name,
            token: token,
            userId: buyer._id.toString(),
            expiresIn: "1h",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

/*==========  Admin operation ==========*/

exports.fetchAllBuyers = async (req, res, next) => {
    try {
        const buyers = await BuyerModel.find().sort({ createdAt: -1 });
        if (!buyers) {
            const error = new Error("Invalid Buyer!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ message: "fetch all buyers", buyers: buyers });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchBuyerById = async (req, res, next) => {
    const bId = req.params.bId;
    try {
        const buyer = await BuyerModel.findById(bId);
        if (!buyer) {
            const error = new Error("Invalid Buyer!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ message: "buyer fetch successfully.", buyer: buyer });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchBuyerByEmail = async (req, res, next) => {
    try {
        const buyer = await BuyerModel.find({ email: req.body.email.trim() });
        if (!buyer) {
            const error = new Error("Invalid Buyer!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ message: "buyer fetch successfully.", buyer: buyer });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteBuyerByAdmin = async (req, res, next) => {
    const bId = req.params.bId;
    try {
        const buyer = await BuyerModel.findByIdAndDelete(bId);
        if (!buyer) {
            const error = new Error("buyer not found in db!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ message: "buyer deleted succesfully", buyer: buyer });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
