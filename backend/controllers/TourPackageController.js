const Tour = require("../models/TourPackage");
const User  = require("../models/UserModels")


exports.createTourPackage = (async (req, res, next) => {
    try{
        const {name , destination , packagePrice , flights , hotelDetails , eventDetails , image } = req.body;
        
      const tour =   await Tour.create({name , destination , packagePrice,flights,hotelDetails,eventDetails  , image})
     
       
       await res.status(201).send({success : true , tour })
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });



exports.updateTourPackage = (async (req, res, next) => {
    try{

        const {name , destination , packagePrice , flights , hotelDetails , _id} = req.body;
      const tour =   await Tour.findByIdAndUpdate( _id ,{name , destination , packagePrice,flights,hotelDetails})
    await   tour.save();
      await tour.populate("flights"  )
      await tour.populate("hotelDetails"  )
      await tour.populate("eventDetails"  )

       await res.status(200).send({success : true , tour})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });


exports.deleteTourPackage = (async (req, res, next) => {
    try{

        const id = req.params.id;
       await Tour.findByIdAndDelete( id )
       await res.status(200).send({success : true , message : "Deleted Successfully"})
       return;
    }catch(err) {
       await  res.send({success:false  , message : err.stack});
    }
    });



    exports.getTours = (async(req,res,next)=>{
      try{
         
         const keyword= req.params.keyword;
     

            // const tours = await Tour.find({"destination" : {$regex : keyword   , $options : 'i'}});
const tours = await Tour.find({$or : [{"destination" : {'$regex' : '.*' + `${keyword}` + '.*' ,$options : 'i'}} , {"name" : {'$regex' : '.*' + `${keyword}` + '.*' ,$options : 'i'}}]});
await res.status(200).send({success:true , tours})

      }catch(err){
       await   res.send({success : false  , message : err.message})
      }
    })


exports.getAllTours = (async(req,res,next)=>{
      try{
         
const tours = await Tour.find().populate("flights" ).populate("eventDetails").populate("hotelDetails");

await res.status(200).send({success:true , tours})

      }catch(err){
       await   res.send({success : false  , message : err.message})
      }
    })


exports.getSingleTour = (async(req,res,next)=>{
      try{
         const id = req.params.id
const tour = await Tour.findById(id);
await tour.populate("eventDetails")
await tour.populate("hotelDetails")
await tour.populate("flights")
tour.save()
await res.status(200).send({success:true , tour})

      }catch(err){
       await   res.send({success : false  , message : err.message})
      }
    })

exports.getTrendingTours = (async(req,res,next)=>{
      try{
        const tours = await Tour.find().sort({"packagePrice" : 1}).limit(7)
await res.status(200).send({success:true , tours})

      }catch(err){
       await   res.send({success : false  , message : err.message})
      }
    })

exports.getLatestTours = (async(req,res,next)=>{
      try{
        const tours = await Tour.find().limit(7)
await res.status(200).send({success:true , tours})

      }catch(err){
       await   res.send({success : false  , message : err.message})
      }
    })