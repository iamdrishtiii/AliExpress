import React from 'react'
import { CiHeart, CiShoppingCart } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addToCart, addToWishlist } from '../action'
import { CgProfile } from 'react-icons/cg'
import { BiHomeAlt } from 'react-icons/bi'
import { FaMoneyCheckAlt, FaUndoAlt, FaTruck, FaShippingFast, FaAward } from 'react-icons/fa';

const DetailPage = () => {
  const products = useSelector((state) => state.products.products)
  const params = useParams()
  const productData = products.filter((item) => {
    return item.id == params.id
  })
  console.log(productData)
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlistItems);
  const cartItems = useSelector((state) => state.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishCount = wishlistItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="py-7 pb-[1100px] md:pb-[600px] lg:pb-[500px]">

      {/* Header Section */}
      <header className="bg-white shadow sticky top-0 z-50 mb-10 py-4 ">
        <div className="flex flex-wrap justify-between items-center px-6 py-4">
          <Link to="/"><BiHomeAlt className='size-12 pr-4' /></Link>
          <div className='font-bold text-2xl'>Detail Page</div>
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
      <div className="px-4 md:px-10 py-8">
        {productData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col lg:flex-row gap-10 bg-white p-6 rounded-2xl shadow-md"
          >
            {/* Image of Selected Item */}
            <div className="lg:w-5/12 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-full max-w-md object-contain rounded-xl"
              />
            </div>

            {/*  Details of Selected Item */}
            <div className="lg:w-7/12">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{item.title}</h1>

              {/* Info Section */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-gray-700 text-sm sm:text-base">
                <div>
                  <p className="font-semibold text-gray-500">Price</p>
                  <p className="text-orange-600 font-semibold">Rs. {item.price}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500">Color</p>
                  <p>{item.color}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500">Brand</p>
                  <p>{item.brand}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500">Model</p>
                  <p>{item.model}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-600 mb-2">Description</h2>
                <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-4 py-6 bg-white">
                {/* Item 1 */}
                <div className="flex flex-col items-center text-center w-16">
                  <div className="bg-gray-100 rounded-full p-3">
                    <FaMoneyCheckAlt className="text-orange-400 text-2xl" />
                  </div>
                  <p className="text-sm text-blue-800 font-medium mt-2">Cash/Pay on Delivery</p>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col items-center text-center w-16">
                  <div className="bg-gray-100 rounded-full p-3">
                    <FaUndoAlt className="text-orange-400 text-2xl" />
                  </div>
                  <p className="text-sm text-blue-800 font-medium mt-2">7 days Returnable</p>
                </div>

                {/* Item 3 */}
                <div className="flex flex-col items-center text-center w-16">
                  <div className="bg-gray-100 rounded-full p-3">
                    <FaTruck className="text-orange-400 text-2xl" />
                  </div>
                  <p className="text-sm text-blue-800 font-medium mt-2">AliExpress Delivered</p>
                </div>

                {/* Item 4 */}
                <div className="flex flex-col items-center text-center w-16">
                  <div className="bg-gray-100 rounded-full p-3">
                    <FaShippingFast className="text-orange-400 text-2xl" />
                  </div>
                  <p className="text-sm text-blue-800 font-medium mt-2">Free Delivery</p>
                </div>

                {/* Item 5 */}
                <div className="flex flex-col items-center text-center w-16">
                  <div className="bg-gray-100 rounded-full p-3">
                    <FaAward className="text-orange-400 text-2xl" />
                  </div>
                  <p className="text-sm text-blue-800 font-medium mt-2">Top Brand</p>
                </div>
              </div>


              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 border border-orange-500 text-orange-500 py-2 px-4 rounded-lg hover:bg-orange-50  flex items-center justify-center gap-2"
                  onClick={() => dispatch(addToCart(item))}
                >
                  <CiShoppingCart className="text-lg" />
                  Add to Cart
                </button>

                <button
                  className="flex-1 border border-pink-500 text-pink-500 py-2 px-4 rounded-lg hover:bg-pink-50  flex items-center justify-center gap-2"
                  onClick={() => {
                    const exists = wishlistItems.some((product) => product.id === item.id);
                    if (!exists) dispatch(addToWishlist(item));
                  }}
                >
                  <CiHeart className="text-lg" />
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default DetailPage