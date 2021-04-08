const express = require("express");
router = express.Router();
const productsController = require("../controlers/products");

router.post("/", productsController.addProducts);

router.get("/", productsController.getproducts);
router.get("/:id", productsController.getSingleProduct);
router.put("/:id", productsController.editProduct);
router.delete("/:id", productsController.deleteSingleProduct);

module.exports = router;
