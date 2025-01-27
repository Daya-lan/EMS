const mongoose = require("mongoose")
const express = require("express")
const AdminRouter = express.Router()
const Admin = require("../models/adminschema")


AdminRouter.post("/AdminLogin", async (req,res)=>{
    try {
        const {userName,password} = req.body
        if(!password){
            res.status(400).json({message: "password is required"});
        }
        const checkAdmin = await Admin.findOne({userName,password});
        if(!checkAdmin){
            res.status(400).json({message:"Admin not found"})
        }
        else{
            res.status(200).json({message:"login successfully"})
        }
    } catch (error) {
        console.log(error.message);
    }
})

AdminRouter.get('/AdminData', async (req,res)=>{
    try {
        const data = await Admin.findOne()
        res.send(data)
    } catch (error) {
        console.log('error when fetching Admin ',error);
        res.status(400).json({message:'error fetching admin ',error})  
    }
})    

AdminRouter.post("/AdminUpdate:email", async(req,res)=>{
    try {
        const {email} = req.params
        const {password} = req.body
        if(email!==email){
            res.status(400).json({message:'your email is invalid,please check'})
        }
        const adminUpdate = await Admin.findOneAndUpdate({email},{password},{new:true})
        if(!adminUpdate){
            res.status(400).json({message:'Admin not found'})
        }
        else{
            res.status(200).json({message:"Admin Update successfully"})
        }
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = AdminRouter
