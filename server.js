const express = require('express')

const path =require("path")
const app = express()
const port =process.env.port|| 4000
app.use(express.static('public'))
app.use(express.json())
 const connectDB=require('./config/db')
 connectDB()


 app.set('views',path.join(__dirname,"/views"))
 app.set('view engine','ejs')
//routes

app.use('/api/files',require('./routes/files'))
app.use('/files',require('./routes/show'))
app.use('/files/download',require('./routes/download'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})