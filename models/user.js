const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

userSchema.method.genToken = function () {
  return jwt.sign(({ _id: this.id }, config.get("jwt")));
};

function validateSchema(params) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().max(255).min(8).required(),
  });
  return schema.validate(params);
}

exports.User = User;
exports.validateSchema = validateSchema;
