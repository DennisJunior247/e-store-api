const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
const config = require("config");

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// modlues import
const error = require("./midlewares/error");
const productsRoute = require("./routes/products");
const categoryRoute = require("./routes/category");

const app = express();

app.use(express.json());

app.use("/category", categoryRoute);
app.use("/products", productsRoute);
// app.use(error);

// connecting to mongo db
const db = process.env.DB || config.get("db");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log(`db connected at ${db}`))
  .catch((err) => console.error(err));

// listing to server
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening ${port}`));
