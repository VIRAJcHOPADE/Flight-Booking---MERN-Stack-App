const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const {createTourPackage , updateTourPackage ,getSingleTour,getAllTours ,deleteTourPackage , getTours} = require( '../controllers/TourPackageController')
const router = express.Router();

router.route("/admin/create/tour").post(isAuthenticatedUser , authorizeRole("admin"),createTourPackage);
router.route("/admin/update/tour").put(isAuthenticatedUser ,authorizeRole("admnin"),updateTourPackage);
router.route("/admin/delete/tour").delete(isAuthenticatedUser , authorizeRole("admin") , deleteTourPackage);
router.route("/get/tours/:keyword").get(isAuthenticatedUser  , getTours);
router.route("/get/all/tours").get(isAuthenticatedUser  , getAllTours);
router.route("/get/tour/:id").get(isAuthenticatedUser  , getSingleTour);
module.exports = router;


