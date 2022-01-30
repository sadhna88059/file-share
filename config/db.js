
require('dotenv').config()
const mongoose = require('mongoose');

// const db='mongodb+srv://sadhna12:lWVf8EKslkhHQ5LD@cluster0.rz0og.mongodb.net/sadhna12?retryWrites=true&w=majority'
// console.log(db)
function connectDB(){
    // "mongodb://localhost:27017/Sadhna18089"
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true}).then(()=>{
        console.log("connect")
    }).catch((err)=>{
        console.log("not")
        console.log(err)
    })
}

module.exports=connectDB