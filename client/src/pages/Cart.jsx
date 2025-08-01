import React, { useState } from 'react';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../action';
import { BiHomeAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import Navbar from '../components/Navbar';

const Cart = () => {
  const [shipping, setShipping] = useState(0);

  const cartItems = useSelector((state) => state.cartItems);
  const wishlistItems = useSelector((state) => state.wishlistItems);
  const user = useSelector((state) => state.user); // Assuming login state stored here
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="py-2 pb-[1000px] md:pb-[500px] lg:pb-[400px]">
      {/* Header */}
      <Navbar/>
      <div className='p-5'>
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-xl text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border p-4 rounded shadow flex flex-col sm:flex-row items-center gap-6"
                >
                  <img src={item.image} alt={item.title} width="100" height="100" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="px-3 py-1 border text-lg font-bold"
                      >
                        -
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="px-3 py-1 border text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                    <p className="mt-2">Price: Rs. {item.price}</p>
                    <p className="font-semibold text-orange-600">
                      Total: Rs. {item.price * item.quantity}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="px-4 py-2 text-red-500 border border-red-300 flex items-center gap-2"
                    >
                      <CiHeart className="size-5" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Cart Total */}
            <div className="border p-6 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>Rs. {subtotal}</span>
              </div>

              <div className="space-y-1 text-sm text-gray-700">
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


              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total:</span>
                <span>Rs. {subtotal + shipping}</span>
              </div>


              <button className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600">
                PROCEED TO CHECKOUT
              </button>

            </div>
          </div>
        )}
      </div></div>
  );
};

export default Cart;

