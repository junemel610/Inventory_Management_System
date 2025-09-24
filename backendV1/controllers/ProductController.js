const Product = require('../models/ProductNet');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;

    // Create a new product with the provided data
    const product = new Product({
      name,
      price,
      quantity,
      description,
      ratings: [],
      averageRating: 0,
    });

    // Save the product to the database
    await product.save();

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    // Find all products
    const products = await Product.find();

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { _id, name, price, quantity, description } = req.body;

    // Find the product by its ID and update its properties
    const product = await Product.findByIdAndUpdate(
      _id,
      { name, price, quantity, description },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { _id } = req.body;

    // Find the product by its ID and delete it
    const product = await Product.findByIdAndDelete(_id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.rateProduct = async (req, res) => {
  try {
    const { _id, rating } = req.body;

    // Validate the rating value
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    // Find the product by its ID
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Initialize the ratings array if it doesn't exist
    if (!product.ratings) {
      product.ratings = [];
    }

    // Update the product's rating
    product.ratings.push(rating);

    // Calculate the new average rating
    const totalRatings = product.ratings.reduce((sum, r) => sum + r, 0);
    product.averageRating = totalRatings / product.ratings.length;

    // Save the updated product
    await product.save();

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Error rating product:', error);
    res.status(500).json({ success: false, message: 'An error occurred while rating the product' });
  }
};