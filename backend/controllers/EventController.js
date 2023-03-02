const Event = require("../models/EventsDetails");


exports.createEvent = (async (req, res, next) => {
    try{

        const {name , destination , eventPrice} = req.body;
      const event =   await Event.create({name , destination , eventPrice})
       await res.status(201).send({success : true , event})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });



exports.updateFlight = (async (req, res, next) => {
    try{

        const {name , destination , eventPrice  , _id} = req.body;
      const event =   await Event.findByIdAndUpdate( _id ,{name , destination , eventPrice})
       await res.status(200).send({success : true , hotel})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });


exports.deleteFlight = (async (req, res, next) => {
    try{

        const { _id} = req.body;
       await Event.findByIdAndDelete( _id )
       await res.status(200).send({success : true , message : "Deleted Successfully"})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });

exports.searchEvents = (async (req, res, next) => {
   try{

       const { keywords} = req.body;
      const events = await Event.find({destination : keywords})
      await res.status(200).send({success : true ,events})
      return;
   }catch(err) {
      await  res.send({success:false  , message : err.stack});
   }
   });