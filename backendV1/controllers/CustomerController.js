const Customer = require('../models/CustomerNew');
const Cart = require('../models/Cart');

exports.createCustomer = async (req, res) => {
    try {
        console.log('Received data in createCustomer:', req.body);

        const { email, username, password, fullname, contactNumber, address } = req.body;

        // Check if the email is already in use
        const isNewCustomer = await Customer.isThisEmailInUse(email);

        if (!isNewCustomer) {
            return res.json({
                success: false,
                message: 'This email is already in use, try logging in.',
            });
        }

        // Create a new customer with all required fields
        const customer = new Customer({
            email,
            username,
            password,
            fullname,
            contactNumber,
            address,
        });

        // Save the customer to the database
        await customer.save();

        console.log('Customer created successfully:', customer);

        // Create a new cart for the customer
        const cart = new Cart({
            customer: customer._id,
        });

        // Save the cart to the database
        await cart.save();

        console.log('Cart created successfully:', cart);

        res.json({ success: true, customer, cart });
    } catch (error) {
        console.error('Error creating customer account:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

exports.customerSignIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the customer based on the username or email
        const customer = await Customer.findOne({ $or: [{ username }, { email: username }] });

        // Check if the customer exists
        if (!customer) {
            return res.json({ success: false, message: 'Username not found.' });
        }

        // Check if the password is correct
        const isMatch = await customer.comparePassword(password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Username/Password is incorrect.' });
        }

        res.json({ success: true, customer });
    } catch (error) {
        console.error('Error during customer login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getCustomerData = async (req, res) => {
    try {
        // Get customer data from the authenticated customer
        const customer = req.user;

        // Construct the response object
        const response = {
            success: true,
            customer: {
                email: customer.email,
                username: customer.username,
                fullname: customer.fullname,
                contactNumber: customer.contactNumber,
                address: customer.address,
            },
        };
        res.json(response);
    } catch (error) {
        console.error('Error getting customer data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.updateCustomerProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const updateData = req.body; 

        // Update admin profile in the database
        const customer = await Customer.findByIdAndUpdate(userId, updateData, { new: true, select: 'email username fullname contactNumber address' });

        // Construct the response object
        const response = {
            success: true,
            user: {
                email: customer.email,
                username: customer.username,
                fullname: customer.fullname,
                contactNumber: customer.contactNumber,
                address: customer.address,
            },
        };

        res.json(response);
    } catch (error) {
        console.error('Error updating customer profile:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};