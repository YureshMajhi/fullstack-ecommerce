const OrderItems = require("../models/orderItemsModel");
const Order = require("../models/orderModel");

const mongoose = require("mongoose");

// create an order
const palceOrder = async (req, res) => {
  const orderItemsIds = await Promise.all(
    // store order items in orderItemsModel
    req.body.orderItems.map(async (orderItem) => {
      const order_item = await OrderItems.create({
        product: orderItem.product,
        quantity: orderItem.quantity,
      });

      if (!order_item) {
        return res.status(400).json({ error: "Something went wrong" });
      }

      return order_item._id;
    })
  );

  // calculate price of each product individually
  const individual_totals = await Promise.all(
    orderItemsIds.map(async (orderItemId) => {
      const item = await OrderItems.findOne({ _id: orderItemId }).populate(
        "product",
        "price"
      );

      if (!item) {
        return res.status(400).json({ error: "Error. No such order" });
      }

      return item.product.price * item.quantity;
    })
  );

  // calculate whole total
  const total = individual_totals.reduce((acc, cur) => acc + cur);

  const {
    user,
    contact_person,
    street,
    city,
    postal_code,
    state,
    country,
    phone,
  } = req.body;

  // check if user id is valid or not
  if (!mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).json({ error: "No such user" });
  }

  const order = await Order.create({
    orderItems: orderItemsIds,
    total: total,
    user,
    contact_person,
    street,
    city,
    postal_code,
    state,
    country,
    phone,
  });

  if (!order) {
    return res.status(400).json({ error: "Cannot place order" });
  }

  res.status(200).json(order);
};

// get all orders
const getOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "username")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    });

  if (!orders) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.status(200).json(orders);
};

// get order details
const getOrderDetails = async (req, res) => {
  const { orderId } = req.params;

  // check if order id is valid or not
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ error: "No such order" });
  }

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  res.status(200).json(order);
};

// get order of a particular user
const getUserOrder = async (req, res) => {
  const { userId } = req.params;

  // check if user id is valid or not
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "No such user" });
  }

  const order = await Order.findOne({ user: userId });
  if (!order) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  res.status(200).json(order);
};

//get order by status
const getOrderStatus = async (req, res) => {
  const { status } = req.query;

  const order = await Order.find({ status: status });
  if (!order) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  res.status(200).json(order);
};

// update status
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findOneAndUpdate(
    { _id: orderId },
    { status },
    { new: true }
  );

  if (!order) {
    return res.status(400).json({ error: "Failed to update order status" });
  }

  res.status(200).json({ msg: "Order status updated" });
};

module.exports = {
  palceOrder,
  getOrders,
  getOrderDetails,
  getUserOrder,
  getOrderStatus,
  updateOrderStatus,
};
