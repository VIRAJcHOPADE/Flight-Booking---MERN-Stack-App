const Flight = require("../models/FlightModel");


exports.createFlight = (async (req, res, next) => {
    try{

        const {company , from , to ,  departure , landing , seatsLeft , ticketPrice , departureTime , landingTime} = req.body;
      const flight =   await Flight.create({company , from , to ,  departure , landing , seatsLeft ,departureTime, landingTime, ticketPrice})
       await res.status(201).send({success : true , flight})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });



exports.updateFlight = (async (req, res, next) => {
    try{

        const {company , from , to ,  departure , landing , seatsLeft , ticketPrice  , departureTime , landingTime ,_id} = req.body;
      const flight =   await Flight.findByIdAndUpdate( _id ,{company , from , to ,  departure , landing , seatsLeft , ticketPrice, departureTime , landingTime})
      await flight.save();
       await res.status(200).send({success : true , flight})
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
       let query = {departure : departure , landing : landing}
      const flights = await Flight.find(query)
      await res.status(200).send({success : true ,flights})
      return;
   }catch(err) {
      await  res.send({success:false  , message : err.stack});
   }
   });