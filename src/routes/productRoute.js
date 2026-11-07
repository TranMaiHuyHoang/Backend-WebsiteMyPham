const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post("/create", productController.createProduct);

router.post("/list", productController.getListProduct);

router.put("/update/:productId", productController.updateProduct);

router.delete("/delete", productController.deleteProduct);

module.exports = router;
