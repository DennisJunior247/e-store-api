const express = require("express");
router = express.Router();
const productsController = require("../controlers/products");

router.post("/", productsController.addProducts);

router.get("/", productsController.getproducts);

module.exports = router;
