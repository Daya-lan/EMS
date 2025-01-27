const mongoose = require("mongoose")
const express = require("express")
const AddEvent = express.Router()
const CreateEvent = require("../models/EventSchema")

AddEvent.post("/AddEvent:userId", async(req,res)=>{
    try {
        const {userId} = req.params;
        const {EventName,category,Venue,pincode, city,startDate,Enddate,GuestList,Budget,Details,Status} = req.body;
        const newEvent = new CreateEvent({EventName,category,Venue,pincode,city,startDate,Enddate,GuestList,Budget,Details,Status,userId})
        if(!newEvent){
            res.status(400).json({message:"Somthing Error Please Try Again"})
        }
        await newEvent.save()
        res.status(200).json({message:"Event Create successfully"})
    } catch (error) {
        console.log(error.message);
    }
})

AddEvent.get("/allEvents", async(req,res)=>{
    try {
        const AllEvents = await CreateEvent.find()
        if(!AllEvents){
            res.status(400).json({message:"Something error while fetching data"})
        }
        else{
            res.status(200).json({message:"Data Fetched Successfully",AllEvents})
        }
    } catch (error) {
        console.log(error.message); 
    }
})


AddEvent.post("/ManageUpdated:_id", async (req,res)=>{
   try {
    const {_id} =req.params;
    const {Status} = req.body;
    const UpdateEvents = await CreateEvent.findByIdAndUpdate({_id},{Status},{new:true});
    if(UpdateEvents){
        res.status(200).json({message:"updated Successfully",UpdateEvents})
    }
    else{
        res.status(400).json({message:"error while update Event"})
    }
   } catch (error) {
    console.log(error.message);
   }
})

AddEvent.post("/DeleteEvent/:_id", async(req,res)=>{
    try {
        const {_id} = req.params
        const DeleteEve = await CreateEvent.findByIdAndDelete(_id)
        if(DeleteEve){
            res.status(200).json({message:"Event Deleted Successfully",DeleteEve})
        }
        else{
            res.status(400).json({message:"Error while dlt event"})
        }
    } catch (error) {
        console.log("Event Delete error",error);
        res.status(400).json({message:"error deleting event"})
    }
})


module.exports = AddEvent