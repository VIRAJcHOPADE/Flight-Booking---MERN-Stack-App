const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const {createFlight , updateFlight,deleteFlight,searchFlights} = require( '../controllers/FlightController')
const router = express.Router();

router.route("/admin/create/hotel").post(isAuthenticatedUser , authorizeRole("admin"),createFlight);
router.route("/admin/update/hotel").put(isAuthenticatedUser ,authorizeRole("admnin"),updateFlight);
router.route("/admin/delete/hotel").delete(isAuthenticatedUser , authorizeRole("admin") , deleteFlight);
router.route("/search/hotel").get(isAuthenticatedUser , searchFlights);
module.exports = router;


