const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
require("express-async-errors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


const db = process.env.DB || "mongodb:localhost/e-store/api"

mongoose
  .connect(db, {useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,})
  .then(console.log(`db connected at ${db}`))
  .catch((err) => console.error(err));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening ${port}`));
