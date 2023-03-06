const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const {createEvent , updateEvent , deleteEvents , searchEvents} = require( '../controllers/EventController')
const router = express.Router();

router.route("/admin/create/event").post(isAuthenticatedUser , authorizeRole("admin"), createEvent);
router.route("/admin/update/event").put(isAuthenticatedUser ,authorizeRole("admin"),updateEvent);
router.route("/admin/delete/event").delete(isAuthenticatedUser , authorizeRole("admin") , deleteEvents);
router.route("/search/event/:dest").get(isAuthenticatedUser,authorizeRole("admin")  , searchEvents);
module.exports = router;


