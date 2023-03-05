const User = require("../models/UserModels.js");
const Flight = require("../models/FlightModel")
const Tour = require("../models/TourPackage")
const sendToken = require("../utils/jwtToken.js");
const FlightModel = require("../models/FlightModel");
const Hotel = require('../models/HotelSchema')


//Register a User

exports.registerUser = (async (req, res, next) => {
    try{

 
        let role = "user";
        if(req.body.role){
            role = "admin";
        }
        
        const { username , name, email, password } = req.body;
        
        const user = await User.create({
            name,
            username,
            email,
            password,
            role,
            
        });
        
        sendToken(user, 201, res);
    }catch(err) {
       await  res.send({success:false  , message : "User Already Exists with this email"});
    }
    });




    //Login User

exports.loginUser = (async (req, res, next) => {
    try{
        const { email, password } = await req.body;
        
        if (!email || !password) {
           await res.status(400).json({success :false , message : "Invalid Email or Password"})
           return;

        }
        
        const user = await User.findOne({ email }).select("+password");
        
        if (!user) {
            await res.status(400).json({success :false , message : "Invalid Email or Password"})
           return;

        }
        
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
          await  res.status(400).json({success :false , message : "Invalid Email or Password"})
           return;
        }
        
         sendToken(user, 200, res);
    }catch(err){
       await res.json({success:false , message : err.message})
    }
    });
    
//Logout User

exports.logout = (async (req, res, next) => {
    try{

      await   res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        
      await   res.status(200).json({ success: true, message: "logged out successfully" });
    }catch(err){
      await   res.send({success  :false , message : err.message});
        
    }
    });

//Update User password

exports.updatePassword = (async (req, res, next) => {
    try{

        const user = await User.findById(req.user.id).select("+password");
        
        const isMatch = await user.comparePassword(req.body.oldPassword);
        
        if (!isMatch) {
           await  res.status(400).send({success :false , message :"Old Password is incorrect"});
            return 
        }
        
        if (req.body.newPassword !== req.body.confirmPassword) {
           await res.status(400).send({success :false , message :" New Password and Confirm Password does not match"});
            return         }
        
        user.password = req.body.newPassword;
        
        await user.save();
        
        sendToken(user, 200, res);
    }catch(err){
       await res.send({success :false , message :err.message});
        
    }
});

//  Update User Profile

exports.updateProfile = (async (req, res, next) => {
    try{

        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            username : req.body.username,
            avatar : req.body.avatar
	};
    

                const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: true,
                });
                
              await  res.status(200).json({ success: true , user : user});
            }catch(err){
              await   res.status(200).send({success : false , message : err.message})
            }
});

// Get User details

exports.getUserDetails = async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.id);
        await user.populate("flights")
         await user.populate("tourPackage")
        
        await user.save()
     return await  res.status(200).send({success:true , user})
    }catch(error){
    return  await  res.status(200).send({success : false , message : "Please Login" , error : error.message})
    }
}

// Get All Users

exports.getAllUsers = async(req,res,next)=>{
    try{
        const users = await User.find();
        const userCount =await  users.length;
      await   res.status(200).send({success:true , users,userCount})
    }catch(error){
      await  res.status(400).send({success : false , message : err.message})
    }
}


// Delete Users
exports.deleteUser = async(req,res,next)=>{
    try{
      
        const user = await User.find({_id : req.user.id});
        if(!user){
            res.status(404).send({success:false , error:"User not found"});
            return;
        }
        await User.findByIdAndDelete( req.user.id);

        res.status(200).send({success:true , message : "Account deleted Successfully"})



        

    }catch(error){
        await res.status(400).send({success : false , message : err.message});
    }
}
exports.deleteUserAdmin = async(req,res,next)=>{
    try{
      
        const user = await User.find({_id : req.body.id});
        if(!user){
            res.status(404).send({success:false , error:"User not found"});
            return;
        }
        await User.findByIdAndDelete( req.body.id);

        res.status(200).send({success:true , message : "User deleted Successfully"})



        

    }catch(error){
        await res.status(400).send({success : false , message : err.message});
    }
}


// Change User Role
exports.changeUserRole = async(req,res,next)=>{
    try{
        const user = await User.findById(req.body.id);

        if(!user){
           await res.status(500).send({success:false , message : "User not found."});

            return;
        }

         user.role = req.body.role;
        await user.save();
    await res.status(200).send({success:true , message : "User Role Updated successfully !!"})

    }catch(error){
        await res.status(400).send({success : false , message : err.message});
    }
}


// Book Flight
exports.bookFlight = async(req,res,next)=>{
    try{
        const {flight} = req.body;
        const user = await User.findById(req.user.id);
        const ThisFlight = await Flight.findById(flight);
        await ThisFlight.seatsLeft--;
        await ThisFlight.save();
        user.flights.push(flight);
        await user.save();
        await user.populate("flights" )
    await res.status(200).send({success:true , message : "Flight Booked Successfully !!" , user})

    }catch(error){
        await res.status(400).send({success : false , message : error.message});
    }
}


// Book Tour
exports.bookTour = async(req,res,next)=>{
    try{
        const { tour} = req.body;
        const user = await User.findById(req.user.id);
        const thisTour = await Tour.findById(tour);
        const flight =await  FlightModel.findById(thisTour.flights);
        await flight.seatsLeft--;
       await  flight.save();
       const thisHotel = await Hotel.findById(thisTour.hotelDetails);
       await thisHotel.roomsLeft--;
       await thisHotel.save();
        await user.tourPackage.push(tour);
        await user.save();
        await (await user.populate("tourPackage" ,"flights"))
        await (await user.populate("tourPackage" ,"hotelDetails"))
        await (await user.populate("tourPackage" ,"eventDetails"))
        // await (await user.populate("tourPackage" )).populate("hotelDetails")
        // await (await user.populate("tourPackage" )).populate("eventDetails")
    await res.status(200).send({success:true , message : "Tour Booked Successfully !!" , user})

    }catch(error){
        await res.status(400).send({success : false , message : error.message});
    }
}