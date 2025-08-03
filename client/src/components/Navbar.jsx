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
      <header className="bg-white shadow sticky top-0 z-50 mb-10 ">
        <div className="flex flex-wrap justify-between items-center px-6 py-4">
          <Link to="/"><BiHomeAlt className='size-12 pr-4' /></Link>
          <Link to="/"> <img src="../Logo.webp" alt="Logo" className="w-36" /></Link>
          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="relative">
              <CiHeart className="text-3xl" />
              {wishCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative">
              <CiShoppingCart className="text-3xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/auth">
              <CgProfile className="text-3xl" />
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar