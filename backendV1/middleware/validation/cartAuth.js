const { check, validationResult } = require('express-validator');

exports.validateCart = [
  (req, res, next) => {
    // Extract the customer information from the token and include it in the request object
    const customerId = req.user.id; // Assuming the customer ID is stored in the "id" field of the user object in the request
    req.body.customer = customerId;
    next();
  },
  check('customer')
    .notEmpty()
    .withMessage('Customer is required.'),

  check('productId')
    .notEmpty()
    .withMessage('Product ID is required.'),

  check('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer.')
];

exports.validateCartMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};