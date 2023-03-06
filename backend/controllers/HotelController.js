const Hotel = require("../models/HotelSchema");


exports.createHotel = (async (req, res, next) => {
    try{

        const {name , destination , roomPrice  , roomsLeft} = req.body;
      const hotel =   await Hotel.create({name , destination , roomPrice  , roomsLeft})
       await res.status(201).send({success : true , hotel})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });



exports.updateHotel = (async (req, res, next) => {
    try{

        const {name , destination , roomPrice  , roomsLeft , _id} = req.body;
      const hotel =   await Hotel.findByIdAndUpdate( _id ,{name , destination , roomPrice  , roomsLeft})
      await hotel.save();
       await res.status(200).send({success : true , hotel})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });


exports.deleteHotel = (async (req, res, next) => {
    try{

        const { _id} = req.body;
       await Hotel.findByIdAndDelete( _id )
       await res.status(200).send({success : true , message : "Deleted Successfully"})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });


    

    
exports.searchHotels = (async (req, res, next) => {
   try{

       const  destination = req.params.dest;
      // const hotels = await Hotel.find({destination : destination})
      const hotels = await Hotel.find({$or : [{"destination" : {'$regex' : '.*' + `${destination}` + '.*' ,$options : 'i'}} ]});

      const hotelCount = await hotels.length;
      await res.status(200).send({success : true ,hotels ,hotelCount } )
      return;
   }catch(err) {
      await  res.send({success:false  , message : err.stack});
   }
   });