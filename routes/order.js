const express = require("express");
const {
  palceOrder,
  getOrders,
  getOrderDetails,
  getUserOrder,
  getOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// order placing route
router.post("/placeorder", palceOrder);

// get all orders route
router.get("/getorders", getOrders);

// get a single order
router.get("/getorderdetails/:orderId", getOrderDetails);

// get order of a single user
router.get("/getuserorder/:userId", getUserOrder);

// get order from status
router.get("/getorderstatus", getOrderStatus);

module.exports = router;
