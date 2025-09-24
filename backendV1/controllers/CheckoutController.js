const Cart = require('../models/Cart');
const Order = require('../models/OrderNet');
const Product = require('../models/ProductNet');
const Customer = require('../models/CustomerNew');

const moment = require('moment-timezone');

// Checkout Cart Function
exports.checkoutCart = async (req, res) => {
  try {
    // Get the cart items for the current customer
    const cart = await Cart.findOne({ customer: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Get the customer's address
    const customer = await Customer.findById(req.user._id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    // Create an order with the cart items and customer's address
    const orderItems = cart.items.map(item => ({
      product: item.product,
      quantity: item.quantity,
    }));

    // Deduct the quantity of ordered products from the product listing
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ success: false, message: 'Insufficient product quantity' });
      }
      product.quantity -= item.quantity;
      await product.save();
    }

    // Create the order with the current date and time adjusted for the user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = moment().tz(userTimezone).toDate();
    const order = new Order({
      customerId: req.user._id,
      customerName: customer.fullname,
      customerAddress: customer.address,
      contactNumber: customer.contactNumber,
      products: orderItems,
      status: 'Pending',
      date: currentDate,
      ref_no: generateReferenceNumber(),
    });

    // Save the order
    await order.save();

    // Clear the cart items
    cart.items = [];
    await cart.save();

    return res.status(200).json({ success: true, message: 'Cart checked out successfully', order });
  } catch (error) {
    console.error('Error checking out cart:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Helper function to generate a reference number
function generateReferenceNumber() {
  // Implement your logic to generate a unique reference number
  return Math.floor(Math.random() * 1000000);
}