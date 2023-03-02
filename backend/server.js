const app = require("./app");
const connectDatabase = require("./db");





//handling uncaught exceptions
process.on("uncaughtException", (err) => {
	console.log(err.message);
	console.log("Shutting down due to unhandled Promise Rejection ");
	process.exit(1);
});

if(process.env.NODE_ENV !== "PRODUCTION"){

	require("dotenv").config();
}


connectDatabase();


const server = app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});


//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error  :${err.message}`);
	console.log("Shutting down due to unhandled Promise Rejection ");
	server.close(() => {
		process.exit(1);
	});
});