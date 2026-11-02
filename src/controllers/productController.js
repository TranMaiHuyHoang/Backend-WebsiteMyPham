const productModel = require('../models/productModel');

class ProductController {
    async createProduct(req, res) {
        try {
            const newProduct = await productModel.create(req.body);
            res.status(200).json({ message: 'Create product successfully', data: newProduct });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    async updateProduct(req, res) {
        const productId = req.params.productId;

        // const { productId } = req.params;

        try {
            const updateProduct = await productModel.findByIdAndUpdate(productId,
                { $set: req.body },
                { new: true, runValidators: true },
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
        try {
            const products = await productModel.find();
            res.status(200).json({ message: 'Get list product successfully', data: products });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }


}

module.exports = new ProductController();
