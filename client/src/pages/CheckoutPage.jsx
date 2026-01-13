import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../action";
import Navbar from "../components/Navbar";
import { Modal } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import { Dialog } from "@headlessui/react";
import useAddresses from "../useAddresses";
import AddAddress from "../components/AddAddress";
import SelectAddress from "../components/SelectAddress";
import toast from "react-hot-toast";
import axios from "axios";
import { Authurl } from "../assets/api";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartItems);
  const token = localStorage.getItem("token");
  const { addresses } = useAddresses();
  const selectedAddress = addresses.find((a) => a.isDefault);

  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [shipping, setShipping] = useState(0);

  const subtotal = cartItems.reduce((total, item) => {
    const discountedPrice = Math.round(
      item.price - (item.price * (item.discount || 0)) / 100
    );
    return total + discountedPrice * item.quantity;
  }, 0);

  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    if (!selectedAddress) {
      toast("Please select a delivery address");
      return;
    }

    try {
      // Prepare order data
      const items = cartItems.map((item) => ({
        productId: item.id,
        title: item.title,
        price: Math.round(
          item.price - (item.price * (item.discount || 0)) / 100
        ),
        quantity: item.quantity,
      }));

      const orderData = {
        items,
        totalAmount: total,
        shipping,
        paymentMethod,
        address: selectedAddress,
      };

      // Send order to backend
      await axios.post(`${Authurl}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Show modal
      setShowModal(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Clear cart
    cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
    // Navigate to order history page
    navigate("/orders");
  };
  if (!token) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg flex items-center gap-3 shadow-md max-w-md mx-auto mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M12 5.07V5m0 14v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-medium">You need to login first</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-24 pb-[1150px] md:pb-[610px] lg:pb-[500px]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Proceed to Checkout
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-lg">
            Your cart is empty.
            <br />
            <Link to="/">
              <button className="bg-orange-400 px-4 py-2 my-3 text-white">
                Continue shopping!
              </button>
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-3">
                Order Summary
              </h3>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => {
                  const discountedPrice = Math.round(
                    item.price - (item.price * (item.discount || 0)) / 100
                  );
                  return (
                    <li
                      key={item.id}
                      className="flex justify-between items-center py-2"
                    >
                      <div>
                        <p className="font-medium text-gray-700">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-orange-600 font-semibold">
                        ₹{discountedPrice * item.quantity}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="flex justify-between font-semibold text-gray-800 pt-3">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-700">Choose Shipping</p>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    value={0}
                    checked={shipping === 0}
                    onChange={() => setShipping(0)}
                  />
                  Free Shipping (₹0)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    value={10}
                    checked={shipping === 10}
                    onChange={() => setShipping(10)}
                  />
                  Standard (₹10)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    value={20}
                    checked={shipping === 20}
                    onChange={() => setShipping(20)}
                  />
                  Express Shipping (₹20)
                </label>
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
              <SelectAddress />
              <button>
                <Link
                  to="/addaddress"
                  className="inline-flex items-center mt-8 gap-2 px-5 py-2.5 
             bg-orange-500 text-white font-semibold rounded-lg
             shadow-md hover:bg-orange-600 hover:shadow-lg"
                >
                  + Add New Address
                </Link>
              </button>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-3">
                Payment Method
              </h3>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                Cash on Delivery (COD)
              </label>

              <button
                onClick={handlePlaceOrder}
                className="bg-orange-500 text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm mx-auto text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-3">
              Order Successful!
            </h2>
            <p className="text-gray-600">
              Your order has been placed successfully using{" "}
              <b>Cash on Delivery</b>.
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
