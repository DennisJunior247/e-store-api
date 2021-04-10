const express = require("express");
router = express.Router();
const ordersController = require("../controlers/orders");

router.post("/", ordersController.addOrders);
router.get("/", ordersController.getOrders);
router.delete("/:id", ordersController.delSingleOrder);
router.delete("/", ordersController.deleteOrders);

module.exports = router;
