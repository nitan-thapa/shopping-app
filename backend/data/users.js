const bcryptjs=require("bcryptjs")
const Users=[
    {name:"admin",email:"admin@admin.com",password:bcryptjs.hashSync("123456",10),isAdmin:true},
    {name:"techinfoyt",email:"techinfoyt@xyz.com",password:bcryptjs.hashSync("123456",10)},
    {name:"user",email:"user@user.com",password:bcryptjs.hashSync("123456",10)},
]

module.exports=Users