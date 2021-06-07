const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");
const bcryptjs=require("bcryptjs")
const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");


const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    const userExist=await User.findOne({email})
    if(userExist)
    {
        throw new Error("user Alredy Exist")
        res.status(400)
    }
    else 
    {
       const user=await User.create({name,email,password})
    //    const user=await User({name,email,password})
    //    await user.save()
       if(user)
       {
           res.status(201).json({
               _id:user._id,
               name:user.name,
               email:user.email,
               isAdmin:user.isAdmin,
               token:generateToken(user._id)
           })
       }
       else 
       {
           throw new Error("user not found")
           res.status(404)
       }

    }
})

const  authController =asyncHandler(async (req,res)=>{
          const {email,password} =req.body
          const user=await User.findOne({email:email})
          
        
         if(user && await user.matchPassword(password))
         {
             res.json({
                 _id:user._id,
                 name:user.name,
                 email:user.email,
                 isAdmin:user.isAdmin,
                 token:generateToken(user._id)
                
                
             })
         }
         else{
             throw new Error("invalid Email or Password")
             res.status(401)
         }
      
 })
const  getUserProfile =asyncHandler(async (req,res)=>{
    const user=await User.findOne(req.user._id)
    if(user)
    {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
           
           
        })

    }
    else 
    {
        throw new Error("user not found")
        res.status(404)
    }

      
 })
const updateUserProfile =asyncHandler(async (req,res)=>{
    const user=await User.findOne(req.user._id)
    if(user)
    {
        user.name=req.body.name||user.name
        user.email=req.body.email||user.email

        if(req.body.password)
        {
            user.password=req.body.password
        }
        // user.password=req.body.password||user.password
      const updateUser=  await user.save()
      res.json({
          _id:updateUser._Id,
          name:updateUser.name,
          email:updateUser.email,
          isAdmin:updateUser.isAdmin,
        //   i think no need to give token
          token:generateToken(updateUser._id)


      })
                  
    }
    else 
    {
        throw new Error("user not found")
        res.status(404)
    }

      
 })

module.exports={authController,getUserProfile,registerUser,updateUserProfile}
