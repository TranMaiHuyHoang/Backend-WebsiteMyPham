const express = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", productController.createProduct);

router.post("/list",authMiddleware, productController.getListProduct);



router.put("/update/:productId", productController.updateProduct);

router.delete("/delete", productController.deleteProduct);

module.exports = router;

