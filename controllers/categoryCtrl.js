const Category = require('../models/categoryModel');
const Products = require('../models/productModel');


const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories);

        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    createCategory: async (req, res) => {
        try {
            //if user have role = 1 -> 
            //admin. only admin can create , delete and update category 
            const {name} = req.body;
            const category = await Category.findOne({name});
            if(category) 
                return res.status(400).json({msg: 'This category already exits.'})

            const newCategory = new Category({name});
            await newCategory.save();

            res.json({msg: 'Create a category'})

        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    deleteCategory: async(req, res) => {
        try {
            const product = await Products.findOne({category: req.params.id});
            if(product) 
                return res.status(400).json({msg: "Please remove all products associated with the category"});

            await Category.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted a category"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    updateCategory: async (req, res) => {
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name});

            res.json({msg: "Update a category"});

        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = categoryCtrl;