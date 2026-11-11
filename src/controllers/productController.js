const categoryModel = require('../models/categoryModel');
const productModel = require('../models/productModel');

class ProductController {
    async createProduct(req, res) {
        try {
            const newProduct = req.body;
            // const { title, description, } = req.body // destructring

            // check categoryId xem có tồn tại hay không ?
            // console.log('newProduct.categoryId:', newProduct.categoryId);
            const categoryExists = await categoryModel.findById(newProduct.categoryId);

            if (!categoryExists) {
                return res.status(404).json({ message: 'Category not found' });
            }

            const product = await productModel.create({
                ...newProduct,
                category: newProduct.categoryId
            });

            // const newProduct = await productModel.create(req.body); // category
            res.status(200).json({ message: 'Product created successfully', data: product });
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

    async getListProduct(req, res) {
        const { page = 1, limit = 10, keyword = '', categoryId, minPrice, maxPrice, sort = -1 } = req.body;
        try {
            const filter = {};

            if (keyword.trim()) {
                filter.title = {
                    $regex: keyword.trim(),
                    $options: 'i',

                };
            }

            if (categoryId) {
                filter.category = categoryId;
            }

            if (minPrice !== undefined || maxPrice !== undefined) {
                filter.price = {};

                if (minPrice !== undefined) filter.price.$gte = minPrice;
                if (maxPrice !== undefined) filter.price.$lte = maxPrice;
            }

            const skip = (page - 1) * limit;

            const sortOrder = Number(sort) === 1 ? 1 : -1;

            const [products, total] = await Promise.all([
                productModel.find(filter)
                    .populate('category')
                    .sort({ createdAt: sortOrder })
                    .skip(skip)
                    .limit(limit)
                    .lean(),

                productModel.countDocuments(filter),

            ]);

            res.status(200).json({
                message: 'Get list product successfully',
                data: products,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = new ProductController();
