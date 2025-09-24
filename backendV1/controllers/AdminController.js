const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminNew');

exports.createAdmin = async (req, res) => {
    try {
        console.log('Received data in createAdmin:', req.body);

        const { email, username, password, fullname, contactNumber } = req.body;

        // Check if the email is already in use
        const isNewAdmin = await Admin.isThisEmailInUse(email);

        if (!isNewAdmin) {
            return res.json({
                success: false,
                message: 'This email is already in use, try logging in.',
            });
        }

        // Create a new admin with all required fields
        const admin = new Admin({
            email,
            username,
            password,
            fullname,
            contactNumber,
        });

        // Save the admin to the database
        await admin.save();

        console.log('Admin created successfully:', admin);

        res.json({ success: true, admin });
    } catch (error) {
        console.error('Error creating admin account:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

exports.adminSignIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the admin based on the username or email
        const admin = await Admin.findOne({ $or: [{ username }, { email: username }] });

        // Check if the admin exists
        if (!admin) {
            return res.json({ success: false, message: 'Username not found.' });
        }

        // Check if the password is correct
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Username/Password is incorrect.' });
        }

        // Generate and send a token if the login is successful
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ success: true, admin, token });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getAdminData = async (req, res) => {
    try {
        // Get admin data from the authenticated admin
        const admin = req.user;

        // Construct the response object
        const response = {
            success: true,
            admin: {
                email: admin.email,
                username: admin.username,
                fullname: admin.fullname,
                contactNumber: admin.contactNumber,
            },
        };

        res.json(response);
    } catch (error) {
        console.error('Error getting admin data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.updateAdminProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const updateData = req.body; // You may want to add validation for allowed fields

        // Update admin profile in the database
        const admin = await Admin.findByIdAndUpdate(userId, updateData, { new: true, select: 'email username fullname contactNumber' });

        // Construct the response object
        const response = {
            success: true,
            user: {
                email: admin.email,
                username: admin.username,
                fullname: admin.fullname,
                contactNumber: admin.contactNumber
            },
        };

        res.json(response);
    } catch (error) {
        console.error('Error updating admin profile:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};