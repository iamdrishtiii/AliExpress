const mongoose = require("mongoose");

/* ADDRESS SCHEMA */
const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

/* ORDER ITEM SCHEMA */
const orderItemSchema = new mongoose.Schema(
  {
    productId: String,
    title: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

/* ORDER SCHEMA */
const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],

    address: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    
    shipping: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "COD",
    },

    status: {
      type: String,
      enum: ["Placed", "Shipped", "Delivered", "Cancelled"],
      default: "Placed",
    },

    orderedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

/* USER SCHEMA */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    addresses: [addressSchema],

    orders: [orderSchema], 
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
