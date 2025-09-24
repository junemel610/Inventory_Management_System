const Cart = require('../models/Cart');
const { ObjectId } = require('mongoose').Types;

exports.addToCart = async (req, res) => {
    const { customer, productId, quantity } = req.body;
  
    try {
      // Find the cart for the customer
      let cart = await Cart.findOne({ customer });
  
      if (!cart) {
        // Create a new cart if it doesn't exist
        cart = new Cart({ customer });
      }
  
      // Check if the product is already in the cart
      const existingItem = cart.items.find((item) => item.product.equals(productId));
  
      if (existingItem) {
        // If the product already exists, update the quantity
        existingItem.quantity += quantity;
      } else {
        // Otherwise, add a new item to the cart
        cart.items.push({ product: productId, quantity });
      }
  
      // Save the cart
      await cart.save();
  
      return res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (error) {
      console.error('Error updating cart:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.removeFromCart = async (req, res) => {
    const { itemId } = req.body;

    try {
        // Get the customer ID from the authenticated user
        const customerId = req.user._id;

        // Find the cart for the current user
        const cart = await Cart.findOne({ customer: customerId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if the itemId is a valid ObjectId
        if (!ObjectId.isValid(itemId)) {
            return res.status(400).json({ message: 'Invalid itemId' });
        }

        // Convert the itemId to an ObjectId
        const itemObjectId = new ObjectId(itemId);

        // Find the index of the item in the cart
        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemObjectId.toString());

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in the cart' });
        }

        // Remove the item from the cart
        cart.items.splice(itemIndex, 1);

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
      // Get the customer ID from the authenticated user
      const customerId = req.user._id;

      // Find the cart associated with the customer
      const cart = await Cart.findOne({ customer: customerId });

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      // Find the index of the item in the cart
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex !== -1) {
          // Update the quantity of the existing item
          cart.items[itemIndex].quantity = quantity;
          await cart.save();
          res.status(200).json({ message: 'Cart item updated successfully' });
      } else {
          // Add a new item to the cart
          const newCartItem = {
              product: productId,
              quantity: quantity
          };
          cart.items.push(newCartItem);
          await cart.save();
          res.status(201).json({ message: 'Cart item added successfully' });
      }
  } catch (error) {
      console.error('Error updating cart item:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCartContents = async (req, res) => {
  try {
      // Get the customer ID from the authenticated user
      const customerId = req.user._id;

      // Find the cart associated with the customer
      const cart = await Cart.findOne({ customer: customerId }).populate('items.product');

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      res.status(200).json(cart);
  } catch (error) {
      console.error('Error getting cart contents:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
