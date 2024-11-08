const express = require('express')
const userRouter = require("./routes/user.routes.js")
const app = express()
const dotenv = require("dotenv")
const connectToDB = require("./conifg/db.js")
connectToDB()
const cookieParser = require("cookie-parser")
const indexRouter = require("./routes/index.routes.js")
dotenv.config()
const fileUpload = require('express-fileupload');

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(fileUpload());

app.use("/", indexRouter)
app.use("/user", userRouter)

app.listen(3000, ()=>{
    console.log("Server is running on 3000 port")
})