import React from 'react';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromWishlist } from '../action';
import Navbar from '../components/Navbar';
import { FaLongArrowAltDown } from 'react-icons/fa';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlistItems);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishCount = wishlistItems.reduce((total, item) => total + item.quantity, 0);
  const token = localStorage.getItem("token")

  return (
    <div className="min-h-screen pb-[1150px] md:pb-[610px] lg:pb-[500px] bg-slate-100">
      <Navbar />

      <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <p className="text-lg text-gray-600 pb-64">Your Wishlist is empty.</p>
        ) : (

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Wishlisted Product Grid */}
            {wishlistItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg  flex flex-col"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-44 h-48 mb-4 rounded-lg "
                  />
                  <h3 className="text-md font-semibold text-gray-800 line-clamp-3 mb-1">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-800 pl-1">Color : {item.color}</p>
                  <div className="mt-2">
                    {item.discount ? (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <p className="text-gray-500 line-through">₹{item.price}</p>
                          <p className="text-green-600 font-semibold">{item.discount}% OFF</p>
                        </div>
                        <p className="font-bold text-orange-500 mb-2">
                          ₹{Math.round(item.price - (item.price * item.discount / 100))}
                        </p>
                      </div>
                    ) : (
                      <p className="font-bold text-orange-500 mb-2">₹{item.price}</p>
                    )}
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <button
                    className="bg-orange-500 text-white py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-orange-600 "
                      onClick={() => {
                        if (!token) {
                              alert("You need to first login");
                              return;
                            }
                            dispatch(addToCart(item))
                      }}
                    >
                      <CiShoppingCart className="size-5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => dispatch(removeFromWishlist(item.id))}
                      className="bg-red-100 text-red-600 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-red-200"
                    >
                      <CiHeart className="size-5" />
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
