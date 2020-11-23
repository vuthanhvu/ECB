const Produtcs = require("../models/productModel");

const productCtrl = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Produtcs.find();
            res.json(products);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            const {product_id, title, price, description, content, images, category, checked, sold} = req.body;

            const newProduct = new Produtcs({
                product_id, title, price, description, content, images, category, checked, sold
            });

            await newProduct.save();

            res.json({msg: "Create new product success."})

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = productCtrl;
