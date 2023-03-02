const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const {createTourPackage , updateTourPackage , deleteTourPackage} = require( '../controllers/TourPackageController')
const router = express.Router();

router.route("/admin/create/tour").post(isAuthenticatedUser , authorizeRole("admin"),createTourPackage);
router.route("/admin/update/tour").put(isAuthenticatedUser ,authorizeRole("admnin"),updateTourPackage);
router.route("/admin/delete/tour").delete(isAuthenticatedUser , authorizeRole("admin") , deleteTourPackage);
module.exports = router;


