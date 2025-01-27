const mongoose = require("mongoose")


const Notification =  new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CreateEvent",
        required:true
    },
    Message:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("Notification",Notification)