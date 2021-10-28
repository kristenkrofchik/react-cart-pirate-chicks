const express = require("express");
const router = express.Router();
const createCheckoutSession = require("../api/checkout");

router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;