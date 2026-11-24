const express = require("express");
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, reviewController.createReview);

router.post("/list", reviewController.getReviewByProductId);

// router.put("/update/:productId", productController.updateProduct);

// router.delete("/delete", productController.deleteProduct);

module.exports = router;
