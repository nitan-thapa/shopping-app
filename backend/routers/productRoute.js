 const express=require('express')
const { getProducts, getProduct } = require('../controllers/productController')
 const router=express.Router()



 router.route("/products").get(getProducts )

 router.route("/products/:id").get(getProduct )



 module.exports=router


//  app.get("/products",(req,res)=>{
//     res.json(Products)

// })
// app.get("/products/:id",(req,res)=>{
//    let product=Products.find((value,i)=>{
//         return(
//             value._id===req.params.id
//         )


//     })
//     res.json(product)

// })