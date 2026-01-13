const User = require("../models/userSchema");

// PLACE ORDER
const placeOrder = async (req, res) => {
   try {
    const userId = req.user.userId;
    const { items, totalAmount, shipping, paymentMethod, address,orderedAt } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const order = {
      items,
      totalAmount,
      shipping,
      paymentMethod,
      address,
    };

    user.orders.push(order);
    await user.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ORDER HISTORY
const getOrders = async (req, res) => {
   try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("orders");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.orders || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { orderId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const order = user.orders.id(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "Delivered") {
      return res
        .status(400)
        .json({ message: "Delivered orders cannot be cancelled" });
    }

    order.status = "Cancelled";
    await user.save();

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { placeOrder, getOrders , cancelOrder};
