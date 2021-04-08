const { productsModel, validate } = require("../models/products");
const { categoryModel } = require("../models/category");
const mongoose = require("mongoose");

class Products {
  async getproducts(req, res) {
    const products = await productsModel.find();

    res.send(products);
  }

  async getSingleProduct(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send("invalid id");

    const product = await productsModel.findById(req.params.id);

    if (!product) return res.status(400).send("invalid product");
    res.send(product);
  }

  async addProducts(req, res) {
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const category = await categoryModel.findById(req.body.categoryId);
    if (!category) return res.send(400).send("invalid categoryId");

    let products = new productsModel({
      pName: req.body.pName,
      pDescription: req.body.pDescription,
      pPrice: req.body.pPrice,
      pQantity: req.body.pQantity,
      pImage: req.body.pImage,
      category: {
        _id: category._id,
        cName: category.cName,
      },
    });

    products = await products.save();
    res.send(products);
  }

  async deleteSingleProduct(req, res) {
    del = await productsModel.findByIdAndDelete(req.params.productId);
    if (!del) return res.status(400).send("product not found");
    res.send(del);
  }

  
  async editProduct(req, res) {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await categoryModel.findById(req.body.categoryId);
    if (!category) return res.status(400).send("category not found");

    let products = productsModel.findOneAndUpdate(
      req.params.id,
      {
        $set: {
          pName: req.body.pName,
          pDescription: req.body.pDescription,
          pPrice: req.body.pPrice,
          pQantity: req.body.pQantity,
          pImage: req.body.pImage,
          category: {
            _id: category_id,
            cName: category.cName,
          },
        },
      },
      { new: true }
    );
    if (!products) return res.status(400).send("invalid product");
    products = await (await products).save();
    res.send(products);
  }
}

const productController = new Products();
module.exports = productController;
