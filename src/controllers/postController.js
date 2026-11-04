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
}

module.exports = new PostController();
