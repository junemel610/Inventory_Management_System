const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ratings: [
        { type: Number, min: 1, max: 5 }
    ],
    averageRating: { 
        type: Number, min: 1, max: 5 
    },
});

module.exports = mongoose.model('Product', ProductSchema);