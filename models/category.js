const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  cName: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 100,
  },
  cDescription: {
    type: String,
    require: true,
    minlength: 20,
  },
  cImage: {
    type: Array,
    require: true,
  },
});

const categoryModel = mongoose.model("category", categorySchema);

function validateSchema(req) {
  const schema = Joi.object({
    cName: Joi.string().min(3).max(100).required(),
    cImage: Joi.array().max(1).min(1),
    cDescription: Joi.string().min(20).required(),
  });

  return schema.validate(req);
}
module.exports.categoryModel = categoryModel;
module.exports.validateSchema = validateSchema;
