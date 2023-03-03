const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const {createFlight , updateFlight,deleteFlight,searchFlights} = require( '../controllers/FlightController')
const router = express.Router();

router.route("/admin/create/flight").post(isAuthenticatedUser , authorizeRole("admin"),createFlight);
router.route("/admin/update/flight").put(isAuthenticatedUser ,authorizeRole("admin"),updateFlight);
router.route("/admin/delete/flight").delete(isAuthenticatedUser , authorizeRole("admin") , deleteFlight);
router.route("/search/flight").get(isAuthenticatedUser , searchFlights);
module.exports = router;


