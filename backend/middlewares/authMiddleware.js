const expressAsyncHandler = require("express-async-handler");
const jwt=require("jsonwebtoken");
const User = require("../models/User");

const protect=expressAsyncHandler(async (req,res,next)=>{
     
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer"))
    {
        try {
            token=req.headers.authorization.split(' ')[1]
            const decode=jwt.verify(token,process.env.JWT_TOKEN)
            req.user=await User.findOne({_id:decode.id}).select("-password")
            next()
        } 
        catch(error)
        { 
    
            console.log(error)
            throw new Error("not authorized ,token failed")
            res.status(401) 
        }
    }
    else 
    {  
        
        throw new Error("Not Authorized ,not token")
        // res.status(401) is not send
        //but if it is written ahead of throw it will show error
        res.status(401)                 
        

    }
}) 


module.exports={protect}