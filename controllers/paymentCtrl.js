const Payments = require('../models/paymentModel');
const Users = require('../models/userModel');
const Products = require('../models/productModel');

const paymentCtrl = {
    getPayments: async (req, res) => {
        try {
            const payment = await Payments.find();
            res.json(payment);
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async (req, res) => {
        const user = await Users.findById(req.user.id).select('name email');
        if(!user) return res.status(400).json({msg: 'User does not exits'});

        const {cart, paymentID, address} = req.body;
        const {_id, name, email} = user;

        const newPayment = new Payments({
            user_id: _id, name, email, paymentID, address, cart
        })

        cart.filter(item => {
            return sold(item._id, item.quantity, item.sold)
        })
        
        await newPayment.save();
        res.json({msg: "Payment success!"});

    }
}

const sold = async (id, quantity, oldSold) => {
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl;