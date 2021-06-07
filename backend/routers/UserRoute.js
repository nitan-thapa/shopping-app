const express=require('express')
const { authController, getUserProfile, registerUser, updateUserProfile } = require('../controllers/usersController')
const { protect } = require('../middlewares/authMiddleware')
 const router=express.Router()

 router.route("/").post(registerUser)
 router.route("/login").post(authController)
 
 router.route("/profile").get( protect ,getUserProfile ).put(protect,updateUserProfile)






 module.exports=router