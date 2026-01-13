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

// Auth
router.post("/signup", signup);
router.post("/login", login);

// Address
router.post("/address",auth, addAddress);
router.get("/address",auth, getAddresses);
router.put("/address/select/:addressId",auth, selectAddress)
router.delete("/address/:addressId", auth, deleteAddress);;

module.exports = router;
