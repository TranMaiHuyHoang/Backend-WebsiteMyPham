const reviewModel = require('../models/reviewModel');
const productModel = require('../models/productModel');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

class ReviewController {
    // // 1. TẠO ĐÁNH GIÁ SẢN PHẨM MỚI
    // async createReview(req, res, next) {
    //     try {
    //         const newReview = req.body;
    //         const productExists = await productModel.findById(newReview.productId);

    //         if (!productExists) {
    //             return ApiResponse.error(res, {
    //                 statusCode: 404,
    //                 message: 'Product not found'
    //             });
    //         }

    //         const review = await reviewModel.create({
    //             ...newReview,
    //             product: newReview.productId
    //         });

    //         return ApiResponse.success(res, {
    //             statusCode: 201,
    //             message: 'Review created successfully',
    //             data: review
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    createReview = asyncHandler(async (req, res) => {
        const newReview = req.body;

        const productExists = await productModel.findById(newReview.productId);
        console.log('newReview', newReview)

        if (!productExists) {
            throw new AppError('Product not found', 404);
        }

        const review = await reviewModel.create({
            ...newReview,
            product: newReview.productId
        });

        return ApiResponse.success(res, {
            message: 'Review created successfully',
            data: review
        });
    });

    // 2. LẤY TẤT CẢ ĐÁNH GIÁ CỦA MỘT SẢN PHẨM THEO PRODUCT_ID
    async getReviewByProductId(req, res, next) {
        try {
            const { productId } = req.body;
            const productExists = await productModel.findById(productId);

            if (!productExists) {
                return ApiResponse.error(res, {
                    statusCode: 404,
                    message: 'Product not found'
                });
            }

            const reviews = await reviewModel.find({ product: productId })
                .sort({ createdAt: -1 }); // Sắp xếp đánh giá mới nhất lên đầu

            return ApiResponse.success(res, {
                statusCode: 200,
                message: 'Get list review successfully',
                data: reviews
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ReviewController();