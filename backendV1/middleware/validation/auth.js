const jwt = require('jsonwebtoken');
const Admin = require('../../models/AdminNew')
const Customer = require('../../models/CustomerNew')

exports.isAuthCustomer = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
  
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decode); // Check the decoded token object in the console
  
        // Retrieve the user from the database
        const user = await Customer.findById(decode.customerId); // Use decode.customerId
        console.log('User:', user); // Check the retrieved user object in the console
  
        if (!user) {
          return res.json({ success: false, message: 'Unauthorized access.' });
        }
  
        req.user = user;
        next();
      } catch (error) {
        console.error('Error during authentication:', error);
        if (error.name === 'JsonWebTokenError') {
          return res.json({ success: false, message: 'Unauthorized access.' });
        }
  
        if (error.name === 'TokenExpiredError') {
          return res.json({ success: false, message: 'Session Expired.' });
        }
  
        res.json({ success: false, message: 'Internal Server Error.' });
      }
    } else {
      res.json({ success: false, message: 'Unauthorized access.' });
    }
  };

exports.isAuthAdmin = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
    
        try {
          const decode = jwt.verify(token, process.env.JWT_SECRET);
          console.log('Decoded Token:', decode); // Check the decoded token object in the console
    
          // Retrieve the user from the database
          const user = await Admin.findById(decode.adminId); // Use decode.adminId
          console.log('User:', user); // Check the retrieved user object in the console
    
          if (!user) {
            return res.json({ success: false, message: 'Unauthorized access.' });
          }
    
          req.user = user;
          next();
        } catch (error) {
          console.error('Error during authentication:', error);
          if (error.name === 'JsonWebTokenError') {
            return res.json({ success: false, message: 'Unauthorized access.' });
          }
    
          if (error.name === 'TokenExpiredError') {
            return res.json({ success: false, message: 'Session Expired.' });
          }
    
          res.json({ success: false, message: 'Internal Server Error.' });
        }
      } else {
        res.json({ success: false, message: 'Unauthorized access.' });
      }
    };