const mongoose = require("mongoose");

const CreateEventSchema = new mongoose.Schema({
  EventName: 
  { 
    type: String, 
    required: true
   },
  category: 
  { 
    type: String, 
    required: true 
  },
  Venue: 
  { 
    type: String, 
    required: true 
  },
  pincode: 
  { type: String, 
    required: true
   },
  city: 
  { 
    type: String, 
    required: true
   },
  startDate: 
  { type: String, 
    required: true
   },
  Enddate: 
  { 
    type: String, 
    required: true 
  },
  GuestList:
   { 
    type: Number, 
    required: true
   },
  Budget: 
  { 
    type: Number,
     required: true 
    },
  Details: 
  { 
    type: String, 
    required: true 
  },
  Status: { 
    type: String 
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
});

module.exports = mongoose.model("CreateEvent", CreateEventSchema);