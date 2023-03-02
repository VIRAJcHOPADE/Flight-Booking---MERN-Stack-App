const mongoose = require("mongoose");


const HotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Enter the hotel name"],
		
	},
    destination : {
        type : String,
        required : [true , "Please enter the destination"]
    },
    roomPrice : {
        type : Number,
        required:true
    },
    roomsLeft : {
        type:Number,
        required:true
    },
   
	
});





module.exports = mongoose.model("Hotels", HotelSchema);