const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validation");

const BuyerModel = require("../models/Buyer");

exports.signupBuyer = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  try {
    const hashPw = await bcrypt.hash(password, 12);
    const user = new BuyerModel({ name: name, email: email, password: hashPw });
    await user.save();
    if (!user) {
      console.log("not added user!");
    }
    res.json({ message: "Buyer created!", userId: user._id });
  } catch (err) {
    console.log(err);
  }
};

exports.loginBuyer = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const buyer = await BuyerModel.findOne({ email: email });
    if (!buyer) {
      console.log("email not found!");
    }
    const isEqual = await bcrypt.compare(password, buyer.password);
    if (!isEqual) {
      throw new Error('wrong password.')
    }
    const token = jwt.sign(
      {
        email: buyer.email,
        userId: buyer._id.toString(),
      },
      "blablabla",
      { expiresIn: "1h" }
    );
    res.json({
      message: "login successfully",
      token: token,
      userId: buyer._id.toString(),
      expiresIn: "1h",
    });
  } catch (err) {
    console.log(err);
  }
};
