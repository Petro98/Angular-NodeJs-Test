const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const isAuth = require('../middlewares/auth/is.auth');
const {authRoutsValidator} = require('../middlewares/validator/validator');
const {responseHandler} = require("../middlewares/response-handler/response-handler");

router.post('/signUp', authRoutsValidator, responseHandler(authController.signUp));

router.post('/login', authRoutsValidator, responseHandler(authController.login));

router.post('/logout', isAuth, responseHandler(authController.logout));

module.exports = router;
