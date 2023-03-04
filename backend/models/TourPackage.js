const mongoose = require("mongoose");


const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Enter the package name"],
		
	},
    image :{
public_id : {
    type:String,
    required : true,
},
url : {
    type:String,
    required : true,

}
    },
    destination : {
        type : String,
        required : [true , "Please enter the destination"]
    },
    packagePrice : {
        type : Number,
        required:true
    },
    flights : 
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Flight"
        }
    ,
    hotelDetails :
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Hotels"
        }
    ,
    eventDetails :
    [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Event"
        }
    ] 
    
	
	
});





module.exports = mongoose.model("Tour", tourSchema);