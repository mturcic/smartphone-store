const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const shortid = require("shortid");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

//Imports
const authRoute = require("./src/routes/auth");
const orderRoute = require("./src/routes/orders");
//Middlewares
app.use("/api/user", authRoute);
app.use("/api/orders", orderRoute);

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    image: String,
    description: String,
    price: [Number],
    availableModels: [String],
    video: String,
  })
);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

// app.update("/api/products/:id", async (req, res) => {
//   const updatedProduct = await Product.findByIdAndUpdate(req.params.id);
//   res.send(updatedProduct);
// });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server up and running"));
