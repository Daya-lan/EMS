const mongoose = require("mongoose")

const OrganizerSchema = new mongoose.Schema({
    OrganizerName : {
        type:String,
        required:true
    },
    OrganizerEmail:{
        type:String,
        required:true,
    },
    OrganizerContact:{
        type:Number,
        required:true,
    },
    OrganizerAddress:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    EventID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CreateEvent",
        required:true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
})

module.exports = mongoose.model("Organizer",OrganizerSchema)