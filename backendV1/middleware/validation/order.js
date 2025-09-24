const { check, validationResult } = require('express-validator');

exports.validateOrder = [
  check('date')
  .trim()
  .not()
  .isEmpty()
  .withMessage('Date is required.'),
  
  check('status')
  .trim()
  .not()
  .isEmpty()
  .withMessage('Status is required.'),
  
  check('ref_no')
  .isInt()
  .withMessage('Reference number must be an integer.'),
];

exports.validateOrderMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};