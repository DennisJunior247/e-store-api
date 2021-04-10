
const Joi = require("joi");
const mongoose = require("mongoose");
const products = require("./products");

const orderSchema = new mongoose.Schema({
  quantity: { type: Number, default: 1, required: true },
  product: { type: products, required: true, },
});

const orderModel = mongoose.model("orders", orderSchema);

function validateSchema(param) {
  const schema = Joi.object({
    productId: Joi.objectId().required(),
    quantity: Joi.number().min(1).required(),
  });

  return schema.validate(param);
}

module.exports.orderModel = orderModel;
module.exports.validateSchema = validateSchema;
