const express = require('express');
const {registerController,loginController,testfun} = require('../controller/AuthController.js');
const {checkLogin}=require('../midlleware/midleware.js');


const router = express.Router();


router.post('/register',registerController);
router.post('/login',loginController)
router.get('/test',checkLogin,testfun)

module.exports= router;
