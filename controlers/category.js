const { validateSchema, categoryModel } = require("../models/category");

class Category {

  async addCategory(req, res) {

    const { error } = validateSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let newCategory = new categoryModel({
      cName: req.body.cName,
      cDescription: req.body.cDescription,
      cImage: req.body.cImage,
    });

    newCategory = await newCategory.save();
    res.send(newCategory);
  }
}

const categoryController = new Category();

module.exports = categoryController;
