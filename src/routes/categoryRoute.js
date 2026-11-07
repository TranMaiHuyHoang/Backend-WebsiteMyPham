const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.post("/create", categoryController.createCategory);

router.get("/list", categoryController.getListCategory);

// router.put("/update/:categoryId", categoryController.updateCategory);

// router.delete("/delete/:categoryId", categoryController.deleteCategory);

module.exports = router;
