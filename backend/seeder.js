const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const connectDb = require("./config/config")
connectDb()

const Products = require("./data/product")
const Users = require("./data/Users")
const Order = require("./models/OrderModel")
const Product = require("./models/ProductModel")
const User = require("./models/user")


const importData=async ()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        const createUser=await User.insertMany(Users)
        const adminUser=createUser[0]._id
        const sampleData= Products.map((product)=>{
            return({...product,user:adminUser})
        })
        await Product.insertMany(sampleData)
        console.log("data imported")
        
    } catch (error) {
        console.log(error.message)
        
    }
  


}
const dataDestroy=async ()=>{
    try{

        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        console.log("data destroy successfully")
    }
    catch(error)
    {
        console.log(error.message)

    }

}

if(process.argv[2]==="-d")
{ 
    // console.log(process.argv)
    // will produce
//      [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'C:\\Users\\acer\\Desktop\\shopping app\\backend\\seeder.js',
//   '-d'
// ]
    dataDestroy()
}
else 
{
    importData()
}