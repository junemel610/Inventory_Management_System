const Order = require('../models/OrderNet');
const Product = require('../models/ProductNet');
const Cart = require('../models/Cart');

// Controller function to get orders for admin
exports.getAdminOrders = async (req, res) => {
  try {
    // Retrieve all orders from the database
    const orders = await Order.find().populate('customerId', 'email username').populate('products.product', 'name price rating');

    // Fetch product details for each order
    const ordersWithProductDetails = await Promise.all(
      orders.map(async (order) => {
        const productDetails = order.products.map((item) => ({
          name: item.product.name,
          price: item.product.price,
          rating: item.product.rating,
          quantity: item.quantity,
        }));
        return {
          _id: order._id,
          customerId: order.customerId,
          customerAddress: order.customerAddress,
          contactNumber: order.contactNumber,
          products: productDetails,
          status: order.status,
          date: order.date,
          ref_no: order.ref_no,
          __v: order.__v,
        };
      })
    );

    res.json({ success: true, orders: ordersWithProductDetails });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Controller function to get orders for a customer
exports.getCustomerOrders = async (req, res) => {
  try {
    const customerId = req.user._id;
    // Retrieve orders associated with the customer ID
    const orders = await Order.find({ customerId }).populate('products.product', 'name price rating');

    // Fetch product details for each order
    const ordersWithProductDetails = await Promise.all(
      orders.map(async (order) => {
        const productDetails = order.products.map((item) => ({
          name: item.product.name,
          price: item.product.price,
          rating: item.product.rating,
          quantity: item.quantity,
        }));
        return {
          _id: order._id,
          customerId: order.customerId,
          customerAddress: order.customerAddress,
          contactNumber: order.contactNumber,
          products: productDetails,
          status: order.status,
          date: order.date,
          ref_no: order.ref_no,
          __v: order.__v,
        };
      })
    );

    res.json({ success: true, orders: ordersWithProductDetails });
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { _id, status } = req.body;

    // Find the order by its _id and update the status
    const updatedOrder = await Order.findOneAndUpdate(
      { _id }, // query
      { status }, // update
      { new: true } // return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by its ID and delete it
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};