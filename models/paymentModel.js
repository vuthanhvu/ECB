const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    paymentID: {
        type: String,
        require: true
    },
    address: {
        type: Object,
        require: true
    },
    cart: {
        type: Array,
        default: []
    },
    status: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
}
)

module.exports = mongoose.model("Payments", paymentSchema);