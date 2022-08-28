const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminModel = require("../models/admin");

exports.signupAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const hashPw = await bcrypt.hash(password, 12);
        const user = new adminModel({ email: email, password: hashPw });
        await user.save();
        if (!user) {
            const error = new Error("Invalid user!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ message: "admin created", userId: user._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.loginAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await adminModel.findOne({ email: email });
        if (!user) {
            const error = new Error("Invalid user!");
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error("wrong password");
        }
        const token = jwt.sign(
            { email: user.email, userId: user._id.toString() },
            process.env.JWT_TOKEN,
            { expiresIn: "365d" }
        );
        res.json({
            message: "admin login successfully",
            token: token,
            userId: user._id.toString(),
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
