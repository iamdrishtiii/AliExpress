import React, { useState } from 'react';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../action';
import Navbar from '../components/Navbar';
import { FaLongArrowAltDown } from 'react-icons/fa';

const Cart = () => {
  const [shipping, setShipping] = useState(0);

  const cartItems = useSelector((state) => state.cartItems);
  const wishlistItems = useSelector((state) => state.wishlistItems);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen pb-[1150px] md:pb-[610px] lg:pb-[500px] bg-slate-100">
      <Navbar />
      <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-lg text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Grid */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => {
                let discountedPrice = 0;
                if (item.discount) {
                  discountedPrice = Math.round(item.price - (item.price * item.discount / 100));
                }
                else {
                  discountedPrice = (item.price)
                }
                return (
                  <div
                    key={item.id}
                    className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row gap-6"
                  >
                    <img src={item.image} alt={item.title} className="w-24 h-24 object-contain rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-md font-semibold text-gray-800 line-clamp-2">{item.title}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="px-3 py-1 border rounded font-bold text-lg hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="px-3 py-1 border rounded font-bold text-lg hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <p className="mt-2 text-sm text-gray-800 pl-1">Color : {item.color}</p>
                      <p className=" text-sm text-gray-800 pl-1">Dispatch within <span className='text-gray-900'>2 days</span> </p>
                      <p className="text-sm text-gray-700 line-through pl-2 mt-1">Price: Rs. {item.price}</p>
                      <p className="text-green-600 font-semibold flex flex-wrap gap-1"><FaLongArrowAltDown className='h-5' />{item.discount || 0}% OFF
                      <p className="text-sm text-gray-700 pl-2"> Rs. {discountedPrice}</p></p>

                      <p className="font-semibold text-orange-600 mt-1">
                        Total: Rs. {discountedPrice * item.quantity}
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
                )
              })}
            </div>

            {/* Cart Total */}
            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 h-fit">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Cart Summary</h2>
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
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
                  Free Shipping (Rs. 0)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    value={10}
                    checked={shipping === 10}
                    onChange={() => setShipping(10)}
                  />
                  Standard (Rs. 10)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    value={20}
                    checked={shipping === 20}
                    onChange={() => setShipping(20)}
                  />
                  Express (Rs. 20)
                </label>
              </div>

              <div className="flex justify-between text-md font-semibold border-t pt-4">
                <span>Total</span>
                <span>Rs. {subtotal + shipping}</span>
              </div>

              <button className="bg-orange-500 text-white w-full py-2 rounded-lg hover:bg-orange-600 transition">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;