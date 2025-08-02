import React from 'react';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromWishlist } from '../action';
import Navbar from '../components/Navbar';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlistItems);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishCount = wishlistItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen pb-[1150px] md:pb-[610px] lg:pb-[500px]">
      <Navbar />
      <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <p className="text-lg text-gray-600">Your Wishlist is empty.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => (
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
                <p className="font-semibold text-orange-600 mb-4">Rs. {item.price}</p>
                <div className="mt-auto flex flex-col gap-3">
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="bg-orange-500 text-white py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-orange-600 "
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
