const mongoose=require("mongoose");
const bcryptjs=require("bcryptjs")
const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
        },
        isAdmin:{
            type:Boolean,
            required:true,
            default:false
        }
    },
    {
        timestamps:true
    }
)
userSchema.methods.matchPassword=async function(enterPasswords){
    return(await bcryptjs.compare(enterPasswords,this.password))
}
//middleware for password
userSchema.pre("save",async function (next){

    if(!this.isModified("password"))
    {
        next()
    }
    else 
    {

        console.log("changed")
     this.password=await bcryptjs.hash(this.password,10)
    }

})
const User=mongoose.model("User",userSchema)
module.exports = User
