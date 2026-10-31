const productModel = require('../models/productModel');

class ProductController {
    async createProduct(req, res) {
        try {
            const newProduct = await productModel.create(req.body);
            res.status(200).json({message: 'Create product successfully', data: newProduct});
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    async getListProduct(req, res) {
        try {
            const products = await productModel.find();
            res.status(200).json({message: 'Get list product successfully', data: products});
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = new ProductController();
