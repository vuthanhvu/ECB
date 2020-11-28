const Products = require("../models/productModel");

//filter, sorting, paginating

class ApiFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString};

        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(exFiled => delete(queryObj[exFiled]));

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)/g, match => '$' + match);

        this.query.find(JSON.parse(queryStr));

        return this;
    }

    sorting(){
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query.sort(sortBy);
        }else {
            this.query.sort('-createdAt');
        }
        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit  * 1 || 9;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    };
}

const productCtrl = {
    getAllProducts: async (req, res) => {
        try {
            const feature = new ApiFeatures(Products.find(), req.query)
            .filtering().sorting().paginating();

            const products = await feature.query;
            res.json({
                status: 'success',
                result: products.length,
                products: products
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            const {product_id, title, price, description, content, images, category, sold} = req.body;
            if(!images) 
                return res.status(400).json({msg: "No image upload"});
            
            if(!title)
                return res.status(400).json({msg: "No title for product"});

            const product = await Products.findOne({product_id});
            if(product)
                return res.status(400).json({msg: " This product already exits"})

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            });

            await newProduct.save();

            res.json({msg: "Create new product success."})

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id);
            res.json({msg: "Product is deleted."})

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const {product_id, title, price, description, content, images, category, checked, sold} = req.body;
            if(!images) 
                return res.status(400).json({msg: "No image upload"});

            await Products.findByIdAndUpdate({_id: req.params.id}, {
                 title: title.toLowerCase(), price, description, content, images, category
            });
            res.json({msg: "Product is updated."})
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = productCtrl;
