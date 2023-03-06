const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const {createTourPackage , updateTourPackage ,getSingleTour,getAllTours ,deleteTourPackage , getTours,getLatestTours, getTrendingTours} = require( '../controllers/TourPackageController')
const router = express.Router();

router.route("/admin/create/tour").post(isAuthenticatedUser , authorizeRole("admin"),createTourPackage);
router.route("/admin/update/tour").put(isAuthenticatedUser ,authorizeRole("admin"),updateTourPackage);
router.route("/admin/delete/tour/:id").delete(isAuthenticatedUser , authorizeRole("admin") , deleteTourPackage);
router.route("/get/tours/:keyword").get( getTours);
router.route("/get/all/tours").get( getAllTours);
router.route("/get/tour/:id").get( getSingleTour);
router.route("/get/latest/tours").get( getLatestTours);
router.route("/get/trending/tours").get(  getTrendingTours);
module.exports = router;


