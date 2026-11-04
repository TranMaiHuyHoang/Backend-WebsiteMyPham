const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Tiêu đề bài viết không được để trống'],
            trim: true
        },
        content: {
            type: String,
            required: [true, 'Nội dung bài viết không được để trống']
        },
        author: {
            type: String,
            default: 'Admin'
        },
        category: {
            type: String,
            default: 'Mẹo làm đẹp'
        },
        thumbnail: {
            type: String,
            default: ''
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

