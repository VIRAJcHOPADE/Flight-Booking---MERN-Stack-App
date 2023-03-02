const Flight = require("../models/FlightModel");


exports.createFlight = (async (req, res, next) => {
    try{

        const {company , from , to ,  departure , landing , seatsLeft , ticketPrice} = req.body;
      const flight =   await Flight.create({company , from , to ,  departure , landing , seatsLeft , ticketPrice})
       await res.status(201).send({success : true , flight})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });



exports.updateFlight = (async (req, res, next) => {
    try{

        const {company , from , to ,  departure , landing , seatsLeft , ticketPrice  , _id} = req.body;
      const flight =   await Flight.findByIdAndUpdate( _id ,{company , from , to ,  departure , landing , seatsLeft , ticketPrice})
       await res.status(200).send({success : true , hotel})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });


exports.deleteFlight = (async (req, res, next) => {
    try{

        const { _id} = req.body;
       await Flight.findByIdAndDelete( _id )
       await res.status(200).send({success : true , message : "Deleted Successfully"})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });


    
exports.searchFlights = (async (req, res, next) => {
   try{

       const { departure , landing} = req.body;
      const flights = await Flight.find({departure : departure , landing : landing})
      await res.status(200).send({success : true ,flights})
      return;
   }catch(err) {
      await  res.send({success:false  , message : err.stack});
   }
   });