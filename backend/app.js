const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IiPSLGowqc4SsvcHw00PKXYRRwBHOhuypUWqltdFWuYXG9BLsv4OmVQ8C7zbs4Zp0uGzWXHhP9IWcu7FEg2zM5r000chZwg76"
);

const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const buyerOrdersRoutes = require("./routes/buyerOrders");
const adminOrdersRoutes = require("./routes/adminOrders");
const buyerRoutes = require("./routes/buyer");
const adminRoutes = require("./routes/admin");
const dailyproductsRoutes = require("./routes/dailyProducts");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// All routes
app.use("/", productRoutes);
app.use("/", categoryRoutes);
app.use("/", buyerOrdersRoutes);
app.use("/", adminOrdersRoutes);
app.use("/", buyerRoutes);
app.use("/", adminRoutes);
app.use("/", dailyproductsRoutes);

// payment
app.post("/pay", async (req, res) => {
  const { email } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
    receipt_email: email,
  });
  console.log("details: ", paymentIntent);
  res.json({ client_secret: paymentIntent["client_secret"] });
});

// Database Connection
const PORT = process.env.PORT || 5000;
const CONNECTION_URL =
  "mongodb+srv://forhad12:forhad123456@cluster0.sonyg.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log("server run at: ", PORT);
    });
  })
  .catch((err) => console.log(err));

// mongoose.set('useFindAndModify', false);
