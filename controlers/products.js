const { productsModel, validate } = require("../models/products");
const { categoryModel } = require("../models/category");

class Products {
  async getproducts(req, res) {
    const products = await productsModel.find();

    res.send(products);
  }

  async getSingleProducts(req,res) {
const

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
}

const productController = new Products();
module.exports = productController;
