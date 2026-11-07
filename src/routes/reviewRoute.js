const express = require("express");
const reviewController = require("../controllers/reviewController");
const router = express.Router();

router.post("/create", reviewController.createReview);

router.post("/list", reviewController.getReviewByProductId);

// router.put("/update/:productId", productController.updateProduct);

// router.delete("/delete", productController.deleteProduct);

module.exports = router;
