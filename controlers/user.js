const { models } = require("mongoose");
const bcrypt = require("bcrypt");
const { User, validateSchema } = require("../models/user");

class User {
  async UserSignUp(req, res) {
    const { error } = validateSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let newUser = await User.findOne({ email: re.body.password });

    if (newUser) return req.status(400).send("awwn user already exits ");

    newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });
    const salt = bcrypt.genSalt(10);
    newUser.password = bcrypt.hash(newUser, salt);

    await newUser.save();

    const token = await User.genToken();

    res.header("x-token-auth", token).send({
      email: newUser.email,
    });
  }
}

const userController = new User();

module.exports = user;
