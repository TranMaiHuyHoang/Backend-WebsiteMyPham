const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// 1. Route tạo bài viết mới
router.post('/create', postController.createPost);

module.exports = router;
