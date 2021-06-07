const jwt=require("jsonwebtoken")

const generateToken = (id)=>{
    token=  jwt.sign({id},process.env.JWT_TOKEN,{
        expiresIn:"15d"
    })
    return(token)

}
module.exports={generateToken}