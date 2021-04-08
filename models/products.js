const Joi = require("joi");
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  pName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },

  pDescription: {
    type: String,
    required: true,
    minlength: 20,
  },
  pImage: {
    type: Array,
    require: true,
  },
  pPrice: {
    type: Number,
    required: true,
  },
  pCategory: {
    category: new mongoose.Schema({
      cName: {
        type: String,
        required: true,
      },
    }),
  },
  pQantity: {
    type: Number,
    required: true,
  },
});

const productsModel = mongoose.model("products", productsSchema);

function validate(req) {
  const val = Joi.object({
    pName: Joi.string().min(5).max(100).require(),
    pDescription: Joi.string().min(20).required(),
    pImage: Joi.array().min(1).max(3).required(),
    pPrice: Joi.number(),
    categoryId: Joi.objectId().required(),
    pQantity: Joi.objectid().required(),
  });
  return val.validate(req);
}

module.exports.productsModel = productsModel;
module.exports.validate = validate;
