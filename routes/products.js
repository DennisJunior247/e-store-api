const express = require("express");
router = express.Router();
const productsController = require("../controlers/products");

router.post("/", productsController.addProducts);

router.get("/", );

module.exports = router;
