const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        comment: {
            type: String,
            trim: true,
            default: '',
        },
    },
    { timestamps: true }
);


const Review = mongoose.model('Review', reviewSchema);

// reviewSchema.index({ product: 1, user: 1 }, { unique: true });
module.exports = Review;
