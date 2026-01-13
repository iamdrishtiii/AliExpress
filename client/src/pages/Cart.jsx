import React from "react";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../action";
import Navbar from "../components/Navbar";
import { FaLongArrowAltDown } from "react-icons/fa";
import Footer from "../components/Footer";

const Cart = () => {
  const token = localStorage.getItem("token");

  const cartItems = useSelector((state) => state.cartItems);
  useSelector((state) => state.wishlistItems);
  useSelector((state) => state.user);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((total, item) => {
    const discountedPrice = Math.round(
      item.price - (item.price * (item.discount || 0)) / 100
    );
    return total + discountedPrice * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen pb-[1150px] md:pb-[610px] lg:pb-[500px] bg-slate-100">
      <Navbar />
      <div className="min-h-[400px]">
        {token ? (
          <div>
            <div className=" min-h-[300px] px-4 md:px-8 py-8 max-w-6xl mx-auto">
              <button>
                  <Link
                    to="/orders"
                    className="inline-flex items-center mb-4 gap-2 px-5 py-2.5 
                       bg-yellow-700 text-white font-semibold rounded-lg
                       shadow-md hover:bg-yellow-800 hover:shadow-lg"
                  >
                    View Order History
                  </Link>
                </button>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Shopping Cart
                
              </h2>

              {cartItems.length === 0 ? (
                <p className="text-lg text-gray-600 pb-64">
                  Your cart is empty.
                </p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Cart Items Grid */}
                  <div className="lg:col-span-2 space-y-6">
                    {cartItems.map((item) => {
                      const discountedPrice = Math.round(
                        item.price - (item.price * (item.discount || 0)) / 100
                      );

                      return (
                        <div
                          key={item.id}
                          className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row gap-6"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-24 h-24 object-contain rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-4 mt-2">
                              <button
                                onClick={() =>
                                  dispatch(decreaseQuantity(item.id))
                                }
                                className="px-3 py-1 border rounded font-bold text-lg hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  dispatch(increaseQuantity(item.id))
                                }
                                className="px-3 py-1 border rounded font-bold text-lg hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <p className="mt-2 text-sm text-gray-800 pl-1">
                              Color : {item.color}
                            </p>
                            <p className=" text-sm text-gray-800 pl-1">
                              Dispatch within{" "}
                              <span className="text-gray-900">2 days</span>{" "}
                            </p>
                            <div className="mt-2">
                              {item.discount ? (
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                    <p className="text-gray-500 line-through">
                                      ₹{item.price}
                                    </p>
                                    <p className="text-green-600 font-semibold">
                                      {item.discount}% OFF
                                    </p>
                                  </div>
                                  <p className="font-bold text-orange-500">
                                    ₹{discountedPrice}
                                  </p>
                                </div>
                              ) : (
                                <p className="font-bold text-orange-500">
                                  ₹{item.price}
                                </p>
                              )}
                            </div>

                            <p className="font-semibold text-orange-600 mt-1">
                              Total: ₹{discountedPrice * item.quantity}
                            </p>
                          </div>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="bg-red-100 w-fit h-fit text-red-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-200 transition"
                          >
                            <CiHeart className="size-5" />
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Cart Total */}
                  <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 h-fit">
                    
                    <div className="flex justify-between text-md font-semibold pb-4">
                      <span>Total</span>
                      <span>₹{subtotal}</span>
                    </div>

                    <Link to="/checkout">
                      <button className="bg-orange-500 text-white w-full py-2 rounded-lg hover:bg-orange-600 transition">
                        PROCEED TO CHECKOUT
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
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
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
