const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const {loginUser  , registerUser , deleteUserAdmin ,getUserDetails, logout , updatePassword ,updateUserAdmin, updateProfile , getAllUsers , deleteUser , changeUserRole , bookFlight , bookTour} = require( '../controllers/userController.js')
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logout);
router.route("/me").get(isAuthenticatedUser,getUserDetails);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/me/updatePassword").put(isAuthenticatedUser, updatePassword);
router.route("/me/delete/account").delete(isAuthenticatedUser, deleteUser);
router.route("/me/book/flight").post(isAuthenticatedUser, bookFlight);
router.route("/me/book/tour").post(isAuthenticatedUser, bookTour);


router.route("/admin/users").get(isAuthenticatedUser,authorizeRole("admin"),getAllUsers);

router.route("/admin/update/user").put(isAuthenticatedUser,  authorizeRole("admin") , updateUserAdmin)
router.route("/admin/delete/user/:id").delete(isAuthenticatedUser,  authorizeRole("admin") , deleteUserAdmin)

router.route("/admin/update/role").put(isAuthenticatedUser , authorizeRole("admin") , changeUserRole)
module.exports = router;


