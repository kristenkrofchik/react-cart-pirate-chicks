const express = require("express");
const router = express.Router();
const createCheckoutSession = require("../api/checkout");


router.get('/create-checkout-session', (req, res) => {
    res.send("Hello World");
}) 

router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;