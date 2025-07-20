const mongoose = require("mongoose")
const express = require("express")
const userrouter = express.Router()
const user = require("../models/UserSchema")


userrouter.post("/UserRegister", async (req,res)=>{
    try {
        const {name,email,userName,password,confirmPassword} = req.body
        const newUser =  new user({name,email,userName,password,confirmPassword})
        if(!newUser){
            res.status(400).json({message:"something Error please check and try again"})
        }

        await newUser.save()
        
        res.status(200).json({message:"Register Successfully"})

    } catch (error) {
        console.log(error.message);  
    }
})


userrouter.post("/userlogin", async(req,res)=>{ 
    try {
        const {userName,password} = req.body

        const CheckUser = await user.findOne({userName:userName,password:password})

        if(!CheckUser){
            res.status(400).json({message: "user Not found"})
        }
        
        if(CheckUser.password == !password){
            res.status(400).json({message:"invalid Password"})
        }
        else{
            res.status(200).json({message:"login successfully",CheckUser})
        }
    } catch (error) {
        console.log(error.message);     
    }
})


  userrouter.get('/TotalUser',async (req,res) =>{
    try {
        const allUser = await user.find()
        res.status(200).json({message:"successfully fetched user", allUser})
    } catch (error) {
        console.log('Error fetching user',error);
        res.status(500).json({message:"'error fetching users",error})   
    }
  } )


userrouter.post("/userUpdate:email", async (req,res) =>{
    try {
        const {email}=req.params
        const {password} = req.body
        if(email!==email){
            res.status(400).json({message: "your email is invalid"})
        }
        const updateUser =  await user.findOneAndUpdate({email},{password},{new:true});
        if(!updateUser){
            res.status(400).json({message:"user not found"})
        }
        else{
            res.status(200).json({message:"updated Successfully"})
        }
    } catch (error) {
        console.log(error.message);
    }
})


userrouter.post("/delete:_id", async (req,res)=>{
    try {
        const UserId = req.params._id
        const DeleteUser = await user.findByIdAndDelete(UserId)
        res.status(200).json({message:"user delete successfully",DeleteUser})
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = userrouter