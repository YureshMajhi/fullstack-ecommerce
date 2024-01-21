const express = require("express");
const {
  sendStripeKey,
  processPayment,
} = require("../controllers/paymentController");
const router = express.Router();

router.get("/getStripeKey", sendStripeKey);
router.post("/processPayment", processPayment);

module.exports = router;
