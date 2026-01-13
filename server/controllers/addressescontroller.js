const User = require("../models/userSchema");

// ADD ADDRESS
const addAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const address = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure only one default address
    if (address.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push(address);
    await user.save();

    res.status(201).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ADDRESSES
const getAddresses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("addresses");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ALWAYS return an array
    res.status(200).json(user.addresses || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SELECT DEFAULT ADDRESS
const selectAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let found = false;

    user.addresses.forEach((addr) => {
      if (addr._id.toString() === addressId) {
        addr.isDefault = true;
        found = true;
      } else {
        addr.isDefault = false;
      }
    });

    if (!found) {
      return res.status(404).json({ message: "Address not found" });
    }

    await user.save();

    res.status(200).json({
      message: "Address selected successfully",
      addressId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE ADDRESS
const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addressIndex = user.addresses.findIndex(
      (addr) => addr._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Check if deleting default address
    const wasDefault = user.addresses[addressIndex].isDefault;

    // Remove address
    user.addresses.splice(addressIndex, 1);

    // If default deleted, set first address as default (optional but recommended)
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    res.status(200).json({
      message: "Address deleted successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  addAddress,
  getAddresses,
  selectAddress,
  deleteAddress
};
