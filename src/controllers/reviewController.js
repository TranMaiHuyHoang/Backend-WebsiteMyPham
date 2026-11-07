const reviewModel = require('../models/reviewModel');
const productModel = require('../models/productModel');

class ReviewController {
    async createReview(req, res) {
        try {
            const newReview = req.body;
            const productExists = await productModel.findById(newReview.productId);

            if (!productExists) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const review = await reviewModel.create({
                ...newReview,
                product: newReview.productId
            });

            res.status(200).json({ message: 'Review created successfully', data: review });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    async updateProduct(req, res) {
        const productId = req.params.productId;

        // const { productId } = req.params;

        try {
            const updateProduct = await productModel.findByIdAndUpdate(
                productId,
                { $set: req.body },
                { new: true, runValidators: true }
            );

            if (!updateProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Update product successfully', data: updateProduct });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async deleteProduct(req, res) {
        const productId = req.body.productId;
        try {
            const deleteProduct = await productModel.findByIdAndDelete(productId);
            if (!deleteProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Delete product successfully' });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getReviewByProductId(req, res) {
        try {
            const { productId } = req.body;
            const productExists = await productModel.findById(productId);

            if (!productExists) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const reviews = await reviewModel.find({ product: productId })
                .sort({ created: -1 });

            res.status(200).json({ message: 'Get list review successfully', data: reviews });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = new ReviewController();
