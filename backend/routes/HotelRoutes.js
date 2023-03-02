const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const {createHotel , updateHotel , deleteHotel, searchHotels } = require( '../controllers/HotelController')
const router = express.Router();

router.route("/admin/create/hotel").post(isAuthenticatedUser , authorizeRole("admin"),createHotel);
router.route("/admin/update/hotel").put(isAuthenticatedUser ,authorizeRole("admnin"),updateHotel);
router.route("/admin/delete/hotel").delete(isAuthenticatedUser , authorizeRole("admin") , deleteHotel);
router.route("/search/hotel").get(isAuthenticatedUser , searchHotels);
module.exports = router;


