import React from 'react';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromWishlist } from '../action';
import { Link } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlistItems);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartItems);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishCount = wishlistItems.reduce((total, item) => total + item.quantity, 0);


  return (
    <div className="py-2">
       <div className='flex flex-wrap gap-2 items-center px-2 sm:px-10 py-4'>
        
         <Link to="/"><BiHomeAlt  className='size-12 pr-4'/></Link>
        <Link to="/"><img src="../Logo.webp"className='hidden md:block' alt="Logo" width="150px" height="50px" /></Link>
        <Link to='/wishlist'  className='absolute right-44'>
          <div className='bg-black text-white p-4 rounded-xl flex items-center gap-1'>
            <CiHeart  className='size-8' />
            <span className='text-xs'>Wishlist</span>
          </div>
          {wishCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishCount}
            </span>
          )}
        </Link>
        <Link to='/cart'  className='absolute right-20'>
          <div className='bg-black text-white p-4 rounded-xl flex items-center gap-1'>
            <CiShoppingCart  className='size-8' />
            <span className='text-xs'>Cart</span>
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        <Link to='/auth'  className='absolute right-2'>
          <div className='border-gray-200 border-2 p-4 rounded-xl'><CgProfile className='size-8'/></div>
        </Link>
      </div>
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