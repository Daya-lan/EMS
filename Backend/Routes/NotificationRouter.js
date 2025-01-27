const mongoose = require("mongoose")
const express = require("express")
const Message = express.Router()
const Notification = require("../models/NotificationSchema")

Message.post("/AddNotification",async(req,res)=>{
    try {
        const {userId,Message} = req.body
        const newMessage = new Notification({userId,Message})
        if(newMessage){
            res.status(200).json({Message:"Message Save Successfully"})
        }
        else{
            res.status(400).json({Message:"Error while Save Message"})
        }
       await newMessage.save()
    } catch (error) {
      console.log("error while save message",error);
    }
})

Message.get("/Notify",async(req,res)=>{
    try {
        const fetchmessage = await Notification.find()
        if(fetchmessage){
            res.status(200).json({Message:"Message Data Fetched Successfully",fetchmessage})
        }
        else{
            res.status(404).json({Message:"Message Not Found"})
        }
    } catch (error) {
        res.status(500).json({Message:"error while fetch message",error})
    }
})

Message.post("/DeleteMsg/:_id",async(req,res)=>{
    try {
        const _id = req.params;
        const deleteMsg = await Notification.findByIdAndDelete(_id)
        if(deleteMsg){
            res.status(200).json({Message:"Message deleted Successfully"})
        }
        else{
            res.status(400).json({Message:"something error, try again later"})
        }
    } catch (error) {
        console.log("error while deleting message",error);
        res.status(500).json({Message:"error while deleting message",error})
    }
})

module.exports = Message