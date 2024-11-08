const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [3, "Username must be atleast 3 charcter long"]
    },
    email:{
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [13, "Email must be atleast 13 charcter long"]
    },
    password:{
        type: String,
        require: true,
        trim: true,
        minlength: [5, "Password must be atleast 5 charcter long"]
    },
})

const user = mongoose.model("user", userSchema)

module.exports = user