const categoryModel = require('../models/categoryModel');

class CategoryController {
    // 1. TẠO Danh Mục
    async createCategory(req, res) {
        try {
            const newCategory = await categoryModel.create(req.body);
            res.status(201).json({
                message: 'Create Category successfully',
                data: newCategory
            });
        } catch (error) {
            res.status(500).json({
                message: 'Create Category Failed',
                error: error.message
            });
        }
    }
    //2 : Lấy danh sách bài viết
    async getListCategory(req, res) {
        try {
            const category = await categoryModel.find().sort({ createdAt: -1, });

            res.status(200).json({
                message: 'Get Category Successfully',
                total: category.length,
                data: category
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

    // 4. Cập nhật bài viết theo ID
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

module.exports = new CategoryController();
