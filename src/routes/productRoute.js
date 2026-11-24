const express = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorMiddleware");
const router = express.Router();

router.post("/create", productController.createProduct);

router.post(
    "/list",
    authMiddleware,
    authorizeRoles('user'),
    productController.getListProduct
);



router.put("/update/:productId", productController.updateProduct);

router.delete("/delete", productController.deleteProduct);

module.exports = router;

