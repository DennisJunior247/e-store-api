const mongoose = require("mongoose");
const { validateSchema, orderModel } = require("../models/orders");
const { productsModel } = require("../models/products");

class Orders {
  async getOrders(req, res) {
    const orders = await productsModel.find();
    res.send(orders);
  }
  async deleteOrders(req, res) {
    const delOrders = await productsModel.remove();
    res.send(delOrders);
  }

  async delSingleOrder(req, res) {
    const product = await productsModel.findByIdAndDelete(req.params.id);
    if (!product) return res.status(400).send("product not found");
    res.send(product);
  }

  async addOrders(req, res) {
    const { error } = validateSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await productsModel.findById(req.body.productId);
    if (!product) return res.status(400).status("product not found");

    let orders = new orderModel({
      quantity: req.body.quantity,
      product: {
        _id: product._id,
        pName: product.pName,
      },
    });

    orders = await orders.save();
    res.send(orders);
  }
}

const ordersController = new Orders();

module.exports = ordersController;
