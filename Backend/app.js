const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config();
const path = require("path")
const UserRouter = require("./Routes/userRouter")
const AdminRouter = require("./Routes/AdminRouter")
const AddEventRouter = require("./Routes/AddEventRouter")
const AssignOrganizerRouter = require("./Routes/AssignOrganizer")
const Message = require("./Routes/NotificationRouter")
const PORT = process.env.PORT || 4000

const corsOption = {
    origin:process.env.APPLICATION_URL,
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
  
}


mongoose.connect(process.env.MONOGDB_URL)
.then(()=>console.log('connected successfully'))
.catch(()=>console.log('failed to connected'))
app.use(cors(corsOption))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use("/Eve", UserRouter,AdminRouter,AddEventRouter,AssignOrganizerRouter,Message)




app.listen(PORT, ()=>{
    console.log('server Running at', PORT)
})