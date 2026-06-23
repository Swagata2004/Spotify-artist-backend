const express = require('express');
const authController = require('../controllers/auth.controllers');
const validationRules=require('../middlewares/validation.middleware')
const router = express.Router();

router.post('/register',validationRules.registerUserValidationRules ,authController.registerUser);
router.post('/login', authController.loginUser);
router.post("/logout",authController.logoutUser)
module.exports = router;
