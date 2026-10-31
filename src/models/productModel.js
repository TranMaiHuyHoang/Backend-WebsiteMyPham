const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        quantify: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        discountPercentage: {
            type: Number,
            default: 0
        },
        rating: {
            type: Number,
            default: 0
        },
        brand: {
            type: String
        },
        category: {
            type: String
        },
        images: {
            type: Array
        },
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;