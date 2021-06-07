const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");

const getProducts =asyncHandler(async (req,res)=>{
    //  by the use of asyncHandle no need to use try and catch
    const products=await Product.find({})
    if(products.length>0)
    {
        res.json(products)
    }
    else
    {
        res.status(404).json({message:"Products NOt Found"})
    }
 })

 const getProduct= asyncHandler(async (req,res)=>{
    const product=await Product.findOne({_id:req.params.id})
    if(product)
    {
        res.json(product)
    }
    else 
    {
        res.status(404).json({message:"Product Not Found"})
    }
})


 module.exports={getProducts,getProduct}