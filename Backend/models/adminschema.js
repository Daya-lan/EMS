const  mongoose = require("mongoose")

const Admin = new mongoose.Schema({
    userName:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true}
})

module.exports = mongoose.model("Admin",Admin)