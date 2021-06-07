const dotenv=require("dotenv")
dotenv.config()

const express=require("express")
const connectDb = require("./config/config")
const Products = require("./data/product")
const { errorHandler } = require("./middlewares/errorMiddlewares")
const productRoutes = require("./routers/productRoute")
const  userRoutes= require("./routers/UserRoute")
const app=express()


connectDb()
PORT=process.env.PORT||8080
app.listen(PORT,()=>{
    console.log(`server is listening in ${process.env.NODE_ENV||"development"} Mode at port ${PORT}`)
})

app.use(express.json())
app.use("/api",productRoutes )
app.use("/api/users",userRoutes )
app.use( errorHandler )
// vvvvimp********************************
//app.use(errHandler) must be used at the last because 
//when app.use("/api",productRoutes) through error it visit the below code wheater there is errorHandler code and not these errorHandler function does not use next
// if it is placed at beginig it will not work



