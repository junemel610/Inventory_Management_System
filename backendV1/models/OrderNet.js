const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  ref_no: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Order', OrderSchema);