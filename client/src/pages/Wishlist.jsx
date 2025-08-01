import React from 'react';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromWishlist } from '../action';
import { Link } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import Navbar from '../components/Navbar';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlistItems);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartItems);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishCount = wishlistItems.reduce((total, item) => total + item.quantity, 0);


  return (
    <div className="py-2 pb-[1000px] md:pb-[500px] lg:pb-[400px]">
       <Navbar/>
      <div className='p-5'>
      <h2 className="text-3xl font-bold mb-6">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-xl text-gray-600">Your Wishlist is empty.</p>
      ) : (
        <ul className="space-y-4">
          {wishlistItems.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow-md flex flex-col sm:flex-row items-center gap-6">
              <img src={item.image} alt={item.title} width="100" height="100" />
              <div className='flex-1'>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                 <p className="font-bold mt-1">Price : Rs. {item.price}</p>
              </div>
              <div className="flex flex-col gap-2">
              <button
                onClick={() => dispatch(addToCart(item))}
                className="border-orange-400 border-2 px-4 py-2 text-orange flex flex-row gap-2 items-center justify-center"
              >
                <CiShoppingCart className="size-6" />
                Add to Cart
              </button>
              <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="px-4 py-2 text-red-500 border border-red-300 flex flex-row gap-2 items-center justify-center"
                >
                  <CiHeart className="size-5" />
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div></div>
  );
};

export default Wishlist;