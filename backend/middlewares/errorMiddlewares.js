const errorHandler=(err,req,res,next)=>{
    // these errorHandler does not use next because it is exectude at last
    const statusCode=res.statusCode===200?500:statusCode
    res.status(statusCode).json({
        message:err.message,
        stack:process.env.NODE_ENV==="Production"?null:err.stack,

    })



}

module.exports={errorHandler}