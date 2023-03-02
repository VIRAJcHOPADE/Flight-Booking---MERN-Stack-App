const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
	company: {
		type: String,
		required: [true, "Please Enter Airlines name"],
		
	},
	from :{
        type:String,
        required:true,

    },
    to :{
        type: String,
        required : true,
    },
    departure:{
        type: Date,
        required:true,
    },
    landing : {
        type : Date,
        required:true,
    },
    seatsLeft : {
        type:Number,
        required:true,
    },
    ticketPrice : {
        type : Number,
        required : true,
    }
});




module.exports = mongoose.model("Flight", flightSchema);