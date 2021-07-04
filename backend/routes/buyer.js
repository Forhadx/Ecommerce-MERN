const express = require('express');

const buyerController = require('../controllers/buyer');

const router = express.Router();

router.post('/buyer/signup', buyerController.signupBuyer);

router.post('/buyer/login', buyerController.loginBuyer);

module.exports = router;