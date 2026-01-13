const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/usercontroller");
const auth = require("../middleware/auth");
const {
  addAddress,
  getAddresses,
  selectAddress,
  deleteAddress,
} = require("../controllers/addressescontroller");
const { placeOrder, getOrders, cancelOrder } = require("../controllers/ordercontroller");

// Auth
router.post("/signup", signup);
router.post("/login", login);

// Address
router.post("/address",auth, addAddress);
router.get("/address",auth, getAddresses);
router.put("/address/select/:addressId",auth, selectAddress)
router.delete("/address/:addressId", auth, deleteAddress);;

//Orders
// Place a new order
router.post("/orders", auth, placeOrder);
router.get("/orders", auth, getOrders);
// routes/userRoutes.js or orderRoutes.js
router.put("/orders/cancel/:orderId", auth, cancelOrder);


module.exports = router;
