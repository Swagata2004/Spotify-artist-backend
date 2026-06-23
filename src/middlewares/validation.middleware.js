const { body, validationResult } = require("express-validator");

const validateRegisterUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const registerUserValidationRules = [
  body("username")
    .isString()
    .withMessage("username must be a string")
    .isLength({ min: 3, max: 15 })
    .withMessage("username must be between 3 and 15 characters"),
  body("password")
    .isString()
    .withMessage("password must be a string")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  body("email")
    .isEmail()
    .withMessage("Invalid email address"),
  validateRegisterUser,
];

module.exports = { registerUserValidationRules };