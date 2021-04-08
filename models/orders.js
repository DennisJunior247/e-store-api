const { valid } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  quantity: { type: Number, default: 1, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
});

const orderModel = mongoose.model("orders", orderSchema);

function validateSchema(param) {
  const schema = Joi.object({
    quantity: Joi.number().min(1).required(),
    product: Joi.ObjectId().required(),
  });

  return schema.validate(schema);
} 

module.exports.orderModel = orderModel;
module.exports.validateSchema = validateSchema;
