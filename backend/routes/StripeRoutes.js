const express = require("express");
const { stripeController } = require("../controllers/StripeController");
const router = express.Router();

router.route('/create-check-out' ).post(stripeController)
module.exports = router;


