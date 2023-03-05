const express = require("express");
const { stripeController } = require("../controllers/StripeController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route('/create-check-out' ).post(isAuthenticatedUser,stripeController)
module.exports = router;


