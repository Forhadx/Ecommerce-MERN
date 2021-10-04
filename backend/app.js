const path = require("path");

const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SK);

const productRoutes = require("./routes/products");
const buyerOrdersRoutes = require("./routes/buyerOrders");
const adminOrdersRoutes = require("./routes/adminOrders");
const buyerRoutes = require("./routes/buyer");
const adminRoutes = require("./routes/admin");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads/images", express.static(path.join("uploads", "images")));

// All routes
app.use("/", productRoutes);
app.use("/", buyerOrdersRoutes);
app.use("/", adminOrdersRoutes);
app.use("/", buyerRoutes);
app.use("/", adminRoutes);
app.use("/", dashboardRoutes);

//ERROR
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

// payment
app.post("/pay", async (req, res) => {
    const { email } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 5000,
        currency: "usd",
        metadata: { integration_check: "accept_a_payment" },
        receipt_email: email,
    });
    // console.log("details: ", paymentIntent);
    res.json({ client_secret: paymentIntent["client_secret"] });
});

// Database Connection
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sonyg.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        app.listen(PORT, () => {
            console.log("server run at: ", PORT);
        });
    })
    .catch((err) => console.log(err));
