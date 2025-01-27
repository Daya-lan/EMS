const mongoose = require("mongoose")
const path = require("path")
const express = require("express")
const OrganizerRouter = express.Router()
const Organizer = require("../models/OrganizerSchema")
const multer = require("multer")
const { storage } = require("../Cloudinary")


const  upload = multer({storage});

OrganizerRouter.post("/AssignOrganizer:EventID", upload.single("image"), async(req,res)=>{
    const {EventID} = req.params;
    const {OrganizerName,OrganizerEmail,OrganizerContact,OrganizerAddress} = req.body;

    if(!req.file){
        res.status(400).json({message:"No File Uploade"});
    }

    try {
        const NewOrganizer = new Organizer({
            OrganizerName:OrganizerName,
            OrganizerEmail:OrganizerEmail,
            OrganizerContact:OrganizerContact,
            OrganizerAddress:OrganizerAddress,
            EventID:EventID,
            image:req.file.path,
        })
        await NewOrganizer.save()
        res.status(200).json({message:"data Saved Successfully",NewOrganizer})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:"Error while saving Data",error})
    }
})


OrganizerRouter.get("/allOrganizer", async (req,res)=>{
    try {
        const AllOrganizer = await Organizer.find()
        if(AllOrganizer){
            res.status(200).json({message:"organizer fetched Successfully",AllOrganizer})
        }
        else{
            res.status(400).json({message:"Organizer Data Not Found"})
        }
    } catch (error) {
        console.log("error while fetch organizer data",error);
    }
})


OrganizerRouter.post("/UpdateOrganizer", upload.single("image"), async(req,res)=>{
    try {
        const {_id,OrganizerName,OrganizerEmail,OrganizerAddress,OrganizerContact,image} = req.body
        const img = req.file ? req.file.filename:image
        const UpdateOrganizer = await Organizer.findByIdAndUpdate({_id},{OrganizerName,OrganizerEmail,OrganizerContact,OrganizerAddress,image:img},{new:true})
        if(UpdateOrganizer){
            res.status(200).json({message:"Organizer Update Successfully",UpdateOrganizer})
        }
        else{
            res.status(404).json({message:"organizer not found"})
        }
    } catch (error) {
        console.log("error while organizer Update",error);
        res.status(500).json({message:"error while Organizer Update",error})
    }
})


OrganizerRouter.post("/dltOrganize/:_id", async(req,res)=>{
    try {
        const {_id} = req.params
        const DltOrganizer = await Organizer.findByIdAndDelete({_id:_id})
        if(DltOrganizer){
            res.status(200).json({message:"Organizer Deleted Successfully"})
        }
        else{
            res.status(404).json({message:"Organizer not Found"})
        }
    } catch (error) {
        console.log("error while Organizer Delete");
        res.status(500).json({message:"error while organizer Delete"})
    }
})


OrganizerRouter.post("/DeleteOrganizer/:DelEventID", async (req,res)=>{
    try {
        const {DelEventID} = req.params
        const DeleteOrganizer = await Organizer.findOneAndDelete({EventID:DelEventID})
        if(DeleteOrganizer){    
            res.status(200).json({message:"Organizer Deleted Successully,",DeleteOrganizer})
        }
        else{
            res.status(404).json({message:"Organizer not found"})
        }
    } catch (error) {
        res.status(500).json({message:"error while Delete Organizer",error})
        console.log("Error while Delete Organizer",error);
    }
})

OrganizerRouter.post("/api/user/:id/action", async (req, res) => {
    const { action } = req.body;
    try {
      const user = await Organizer.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Organizer not found" });
      }
  
      user.status = action; // Either 'accepted' or 'rejected'
      await user.save();
  
      res.json({ message: `User ${user.name} is ${action}ed`, user });
    } catch (error) {
      res.status(500).json({ error: "Failed to update Organizer status" });
    }
  });




module.exports = OrganizerRouter





