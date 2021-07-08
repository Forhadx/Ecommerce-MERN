const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/products");
const categoryRoutes = require('./routes/categories');
const buyerOrdersRoutes = require("./routes/buyerOrders");
const adminOrdersRoutes = require("./routes/adminOrders");
const buyerRoutes = require('./routes/buyer');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', productRoutes);
app.use('/', categoryRoutes);
app.use('/', buyerOrdersRoutes);
app.use('/', adminOrdersRoutes);
app.use('/', buyerRoutes);
app.use('/', adminRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL =
  "mongodb+srv://forhad12:forhad123456@cluster0.sonyg.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, ()=>{
        console.log('server run at: ', PORT)
    });
  })
  .catch((err) => console.log(err));


// mongoose.set('useFindAndModify', false);