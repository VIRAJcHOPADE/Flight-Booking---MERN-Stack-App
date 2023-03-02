const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth.js");
const {loginUser  , registerUser , logout} = require( '../controllers/userController.js')
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logout);


module.exports = router;
