const postModel = require('../models/postModel');

class PostController {
    // 1. TẠO BÀI VIẾT MỚI
    async createPost(req, res) {
        try {
            const newPost = await postModel.create(req.body);
            res.status(201).json({
                message: 'Create Post successfully',
                data: newPost
            });
        } catch (error) {
            res.status(500).json({
                message: 'Create Post Failed',
                error: error.message
            });
        }
    }
    //2 : Lấy danh sách bài viết
    async getListPost(req, res) {
        try {
            const posts = await postModel.find();

            res.status(200).json({
                message: 'Get List Post Successfully',
                data: posts
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    //3 Lấy chi tiết 1 bài viết

    async getPostDetail(req, res) {
        try {
            const post = await postModel.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post Not Found' });
            }
            res.status(201).json({
                message: 'Get Post Detail Success',
                data: post
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // 4. Cập nhật bài viết thei ID
    async updatePost(req, res) {
        const postId = req.params.postId;
        try {
            const updatedPost = await postModel.findByIdAndUpdate(
                postId,
                { $set: req.body },
                { new: true, runValidators: true } // Trả về dữ liệu mới sau khi sửa
            );
            if (!updatedPost) {
                return res.status(404).json({ message: 'Post Not Found' });
            }
            res.status(200).json({
                message: 'Update Post Successfully',
                data: updatedPost
            });
        } catch (error) {
            res.status(500).json({
                message: 'Update Post Failed',
                error: error.message
            });
        }
    }
}

module.exports = new PostController();
