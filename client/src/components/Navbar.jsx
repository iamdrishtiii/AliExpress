import React from 'react'
import { BiHomeAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {

        const cartItems = useSelector((state) => state.cartItems);
  const wishlistItems = useSelector((state) => state.wishlistItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishCount = wishlistItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
        <div className="flex flex-wrap gap-2 items-center px-2 sm:px-10 py-4">
        <Link to="/"><BiHomeAlt className='size-12 pr-4' /></Link>
        <Link to="/" > <img src="../Logo.webp" className='hidden md:block' alt="Logo" width="150px" height="50px" /></Link>
        <Link to="/wishlist" className='absolute right-44'>
          <div className="bg-black text-white p-4 rounded-xl flex items-center gap-1">
            <CiHeart className='size-8' />
            <span className="text-xs">Wishlist</span>
          </div>
          {wishlistItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishlistItems.length}
            </span>
          )}
        </Link>
        <Link to="/cart" className='absolute right-20'>
          <div className="bg-black text-white p-4 rounded-xl flex items-center gap-1">
            <CiShoppingCart className='size-8' />
            <span className="text-xs">Cart</span>
          </div>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>
        <Link to="/auth" className='absolute right-2'>
          <div className="border-gray-200 border-2 p-4 rounded-xl"><CgProfile className='size-8' /></div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar