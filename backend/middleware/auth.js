const jwt = require('jsonwebtoken');
const User = require("../models/UserModels.js");


exports.isAuthenticatedUser = (async(req,res,next)=>{
    try{

        const {token} = req.cookies;
        if(!token){
            res.status(401).send({success:false , message : "Please Login to access this page"})
        return ;
    }
    const decodedData = jwt.verify(token , "nadfvcnsdcsvsdjvjsd");
    req.user = await User.findById(decodedData.id)
    next();
    
}catch(err){
    res.status(500).send({success:false , message : err.message});
}
});


exports.authorizeRole = (...roles)=>{
    return (req,res,next)=>{{
        if(!roles.includes(req.user.role)){
            res.status(403).send({success : false  , message : `Role  : ${req.user.role} is not allowed to access this resource`})
          return
        }
        else{

            next();
        }
    }}

}