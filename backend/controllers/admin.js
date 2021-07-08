const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminModel = require("../models/admin");

exports.signupAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashPw = await bcrypt.hash(password, 12);
    const user = new adminModel({ name: name, email: email, password: hashPw });
    await user.save();
    if (!user) {
      console.log("user not added");
    }
    res.json({ message: "admin created", userId: user._id });
  } catch (err) {
    console.log(err);
  }
};

exports.loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await adminModel.findOne({ email: email });
    if (!user) {
      console.log("email not found!");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("wrong password");
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      "blablabla",
      { expiresIn: "1h" }
    );
    res.json({
      message: "admin login successfully",
      token: token,
      userId: user._id.toString(),
    });
  } catch (err) {
    console.log(err);
  }
};
