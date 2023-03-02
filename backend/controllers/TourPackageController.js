const Tour = require("../models/TourPackage");
const User  = require("../models/UserModels")


exports.createTourPackage = (async (req, res, next) => {
    try{

        const {name , destination , packagePrice , flights , hotelDetails , eventDetails , user_id} = req.body;
      const tour =   await Tour.create({name , destination , packagePrice,flights,hotelDetails,eventDetails})
        const user = await User.findById(user_id)
        await user.tourPackage.push(tour);
        await user.save()
        await tour.populate(["Flight" , "Hotels" , "Event"])
       await res.status(201).send({success : true , tour , user})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });



exports.updateTourPackage = (async (req, res, next) => {
    try{

        const {name , destination , packagePrice , flights , hotelDetails , eventDetails , _id} = req.body;
      const tour =   await Tour.findByIdAndUpdate( _id ,{name , destination , packagePrice,flights,hotelDetails,eventDetails})
      await tour.populate(["Flight" , "Hotels" , "Event"])
       await res.status(200).send({success : true , tour})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });


exports.deleteTourPackage = (async (req, res, next) => {
    try{

        const { _id} = req.body;
      const tour =   await Tour.findByIdAndDelete( _id )
       await res.status(200).send({success : true , message : "Deleted Successfully"})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });

