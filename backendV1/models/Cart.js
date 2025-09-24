const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const CartSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: [CartItemSchema]
});

module.exports = mongoose.model('Cart', CartSchema);
