const express  = require('express');
const router = express.Router();

const axios = require('axios');
// Route to return the public IP address
router.get('/public-ip', async (req, res) => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    const publicIPAddress = response.data.ip;
    res.json({ publicIPAddress });
  } catch (error) {
    console.error('Error getting public IP address:', error);
    res.status(500).json({ message: 'Error getting public IP address' });
  }
});


const { createAdmin, adminSignIn, getAdminData, updateAdminProfile } = require('../controllers/AdminController');
const { createCustomer, customerSignIn, getCustomerData, updateCustomerProfile } = require('../controllers/CustomerController');
const { createProduct, getProduct, updateProduct, deleteProduct, rateProduct } = require('../controllers/ProductController');
const { updateOrder, deleteOrder, getAdminOrders, getCustomerOrders} = require('../controllers/OrderController');
const { addToCart, removeFromCart, getCartContents, updateCartItem } = require('../controllers/CartController');
const { checkoutCart } = require('../controllers/CheckoutController');
//const { sendVerificationCode, verifyCode, resetPassword } = require('../controllers/ForgotPasswordController');

const { validateAdminSignUp, validateCustomerSignUp, userValidation, validateUserSignIn, validatePassReset } = require('../middleware/validation/users');
const { isAuthAdmin, isAuthCustomer } = require('../middleware/validation/auth');
const { validateProduct, validateProductMiddleware } = require('../middleware/validation/product');
const { validateCart, validateCartMiddleware } = require('../middleware/validation/cartAuth');
//const { validateOrder, validateOrderMiddleware } = require('../middleware/validation/order');

router.post('/create-post-customer', isAuthCustomer, (req, res) => {
    res.send('Token Authentication path');
});
router.post('/create-post-admin', isAuthAdmin, (req, res) => {
    res.send('Token Authentication path');
});

//Customer
router.post('/create-customer', validateCustomerSignUp, createCustomer); //Working
router.post('/customer-sign-in', validateUserSignIn, userValidation, customerSignIn); //Working
router.get('/customer-data', isAuthCustomer, getCustomerData); //Working
router.post('/checkout', isAuthCustomer, checkoutCart); //Working
router.patch('/rate-product', isAuthCustomer, rateProduct);
router.get('/customer/orders', isAuthCustomer, getCustomerOrders); //Working
router.get('/product-data-customer', isAuthCustomer, getProduct); //Working
router.patch('/update-customer', isAuthCustomer, updateCustomerProfile); //Working

//Customer Cart
router.post('/add-to-cart', isAuthCustomer, validateCart, validateCartMiddleware, addToCart); //Working
router.delete('/remove-from-cart', isAuthCustomer, removeFromCart); //Working
router.patch('/update-cart-item', isAuthCustomer, updateCartItem ); //Working
router.get('/cart-contents', isAuthCustomer, getCartContents); //Working


//Admin
router.post('/create-admin', validateAdminSignUp, createAdmin); //Working
router.post('/admin-sign-in', validateUserSignIn, userValidation, adminSignIn); //Working
router.post('/add-product', createProduct, validateProduct, validateProductMiddleware); //Working
router.get('/admin-data', isAuthAdmin, getAdminData); //Working
router.get('/admin/orders', isAuthAdmin, getAdminOrders); //Working
router.get('/product-data-admin', isAuthAdmin, getProduct); //Working
router.patch('/update-admin', isAuthAdmin, updateAdminProfile); //Working
router.patch('/update-order', isAuthAdmin, updateOrder); //Working
router.patch('/update-product', isAuthAdmin, updateProduct); //Working
router.delete('/delete-product', isAuthAdmin, deleteProduct); //Working

//router.delete('/delete-order', isAuthAdmin, deleteOrder);

//Password Reset Function
/*
router.post('/send-code', sendVerificationCode);
router.post('/verify-code', verifyCode);
router.patch('/reset-password', resetPassword);
*/

module.exports = router;
