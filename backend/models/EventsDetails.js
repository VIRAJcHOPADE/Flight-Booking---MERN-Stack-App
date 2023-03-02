const mongoose = require("mongoose");


const eventDetails = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Enter the Event Name"],
		
	},
    destination : {
        type : String,
        required : [true , "Please enter the destination"]
    },
    eventPrice : {
        type : Number,
        required:true
    },
  
	
});





module.exports = mongoose.model("Event", eventDetails);