const { productsModel, validate } = require("../models/products");
const { Category } = require("../models/category");

class Products {

    async getproducts (req, res) {
        const products = await Products.find();
      
        res.send(products);
      }

  async addProducts(req, res) {
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findbyId(req.params.categoryId);
    if (!category) return res.send(400).send("invalid categoryId");

    let products = new productsModel({
      pName: req.body.pName,
      pDescription: req.body.pDescription,
      pPrice: req.body.pPrice,
      pQantity: req.body.pQantity,
      pImage: req.body.pImage,
      pCategory: {
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
