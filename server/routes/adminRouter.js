const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')
const userAuth = require('../middlewares/userAuth')
router.post('/',adminController.admin_login)
router.get('/isAdminAuth',userAuth.adminJwt,adminController.isAdminAuth)
router.get('/getUsers',userAuth.adminJwt,adminController.getUsers)
router.post('/delete_user',userAuth.adminJwt,adminController.deleteUsers)
router.post('/block_user',userAuth.adminJwt,adminController.block_user)



module.exports= router