const OrderItems = require("../models/orderItemsModel");
const Order = require("../models/orderModel");

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

  const order = await Order.create({
    orderItems: orderItemsIds,
    total: total,
    user: req.body.user,
    contact_person: req.body.contact_person,
    street: req.body.street,
    city: req.body.city,
    postal_code: req.body.postal_code,
    state: req.body.state,
    country: req.body.country,
    phone_number: req.body.phone_number,
  });

  if (!order) {
    return res.status(400).json({ error: "Cannot place order" });
  }

  res.status(200).json(order);
};
