const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/admin/signup', adminController.signupAdmin);

router.post('/admin/login', adminController.loginAdmin);

module.exports = router;