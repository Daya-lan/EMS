const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true 
},
  userName: { 
    type: String, 
    required: true 
},
  password: { 
    type: String, 
    required: true 
},
  confirmPassword: { 
    type: String, 
    required: true 
},
});

const User = (module.exports = mongoose.model("user", userSchema));
