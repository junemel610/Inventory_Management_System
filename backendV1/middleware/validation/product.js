const { check, validationResult } = require('express-validator');

exports.validateProduct = [
  check('name')
  .trim()
  .not()
  .isEmpty()
  .withMessage('Name is required.'),
  
  check('price')
  .isDecimal()
  .withMessage('Price must be a decimal number.'),
  
  check('quantity')
  .isInt()
  .withMessage('Quantity must be an integer.'),
  
  check('description')
  .trim()
  .not()
  .isEmpty()
  .withMessage('Description is required.'),
  
  check('rating')
  .optional()
  .isDecimal()
  .withMessage('Rating must be a decimal number.'),
];

exports.validateProductMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};