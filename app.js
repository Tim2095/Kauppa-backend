const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const productController = require("./controllers/product");
const path = require("path");

app.use(express.json());
app.use(cors());

// MongoDB connection
const dbPassword = process.env.DB_PASSWORD;
const dbUrl = process.env.DB_URL.replace("<db_password>", dbPassword);

mongoose.set("strictQuery", false);
console.log(`Connecting to ${dbUrl}`);

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => console.log("Error connecting to mongo DB", error.message));

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use("/api/products", productController);

module.exports = app;
