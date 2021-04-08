const express = require("express");
router = express.Router();
const categoryController = require("../controlers/category");



router.post("/", categoryController.addCategory);
router.get("/", categoryController.getCategory);

module.exports = router;
