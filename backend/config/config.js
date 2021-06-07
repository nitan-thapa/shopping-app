const mongoose = require('mongoose')
const connectDb=async()=>{
    try {
       const conn =await mongoose.connect(process.env.MONGO_URL,{
                useUnifiedTopology:true,
                useNewUrlParser:true,
                useCreateIndex:true,
                useFindAndModify:false
        })
        console.log(`Mongodb Connected ${conn.connection.host}`)
        
    } catch (error) {
        console.log(`Error:${error.message}`)
        
    }
}
module.exports = connectDb