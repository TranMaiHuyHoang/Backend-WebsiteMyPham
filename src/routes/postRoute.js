const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// 1. Route tạo bài viết mới
router.post('/create', postController.createPost);

//2 . Lấy danh sách bài viết
router.get('/list', postController.getListPost);

//3 lấy chi tiết bài viết
router.get('/detail/:id', postController.getPostDetail);


// 4 Cập nhật bài viết
router.put('/:postId', postController.updatePost);

module.exports = router;
