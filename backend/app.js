const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
app.use(cookieParser());
var cors = require('cors')


	require("dotenv").config();

app.use(cors())
app.use(express.json({limit:'50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({  
    limit:'50mb' ,
extended: true ,
 parameterLimit:50000}));


 const user  = require('./routes/userRoute.js')
 const event  = require('./routes/eventRoutes')
const flight  = require('./routes/FlightRoutes')
const hotel = require('./routes/HotelRoutes')
const tour = require('./routes/tourPackageRoute')
const stripe = require('./routes/StripeRoutes')

app.use("/api/v1/", user);
app.use("/api/v1/", event);
app.use("/api/v1/", flight);
app.use("/api/v1/", hotel);
app.use("/api/v1/", tour);
app.use("/api/v1/", stripe);

// app.use(express.static(path.join(__dirname, "../frontend/src")));

// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(path.join(__dirname, "../frontend/build/index.html")))
// })

module.exports = app;