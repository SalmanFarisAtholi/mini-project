const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const userAuth = require('../middlewares/userAuth')

router.post('/signup',userController.signup_post)
router.post('/login',userController.signin_post)
router.get('/isUserAuth',userAuth.verifyJWT,userController.isUserAuth)
router.post('/user_edit',userAuth.verifyJWT,userController.userEdit)
module.exports= router