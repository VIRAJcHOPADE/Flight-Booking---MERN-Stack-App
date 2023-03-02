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


// const product  = require('./routes/productRoute')
// const user  = require('./routes/userRoute')
// const order  = require('./routes/orderRoute')
// const poster = require('./routes/posterRoute')

// app.use("/api/v1/", product);
// app.use("/api/v1/", user);
// app.use("/api/v1/", order);
// app.use("/api/v1/", poster);

// app.use(express.static(path.join(__dirname, "../frontend/src")));

// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(path.join(__dirname, "../frontend/build/index.html")))
// })

module.exports = app;