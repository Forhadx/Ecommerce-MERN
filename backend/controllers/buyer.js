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
      throw new Error("wrong password.");
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

/*==========  Admin operation ==========*/

exports.fetchAllBuyers = async (req, res, next) => {
  try {
    const buyers = await BuyerModel.find().sort({ createdAt: -1 });
    if (!buyers) {
      console.log("buyers not found!");
    }
    res.json({ message: "fetch all buyers", buyers: buyers });
  } catch (err) {
    console.log(err);
  }
};

exports.fetchBuyerById = async (req, res, next) => {
  const bId = req.params.bId;
  try {
    const buyer = await BuyerModel.findById(bId);
    if (!buyer) {
      console.log("buyer not found!");
    }
    res.json({ message: "buyer fetch successfully.", buyer: buyer });
  } catch (err) {
    console.log(err);
  }
};

exports.fetchBuyerByEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const buyer = await BuyerModel.findOne({ email: "mohsin@gmail.com" });
    if (!buyer) {
      console.log("buyer not found!");
    }
    res.json({ message: "buyer fetch successfully.", buyer: buyer });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteBuyerByAdmin = async (req, res, next) => {
  const bId = req.params.bId;
  try {
    const buyer = await BuyerModel.findByIdAndDelete(bId);
    if (!buyer) {
      console.log("buyer not found in db!");
    }
    res.json({ message: "buyer deleted succesfully", buyer: buyer });
  } catch (err) {
    console.log(err);
  }
};
