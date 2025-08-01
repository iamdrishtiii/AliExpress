import React from 'react'
import { CiHeart, CiShoppingCart } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addToCart, addToWishlist } from '../action'
import { CgProfile } from 'react-icons/cg'
import { BiHomeAlt } from 'react-icons/bi'
import Footer from '../components/Footer'

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
    <div className="py-7 ">
      <div className='flex flex-wrap gap-2 items-center px-2 sm:px-10 py-4'>
        <Link to="/"><BiHomeAlt className='size-12 pr-4' /></Link>
        <h1 className='text-3xl font-bold hidden md:block'> Detail page</h1>
        <Link to='/wishlist' className='absolute right-44'>
          <div className='bg-black text-white p-4 rounded-xl flex items-center gap-1'>
            <CiHeart className='size-8' />
            <span className='text-xs'>Wishlist</span>
          </div>
          {wishCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishCount}
            </span>
          )}
        </Link>
        <Link to='/cart' className='absolute right-20'>
          <div className='bg-black text-white p-4 rounded-xl flex items-center gap-1'>
            <CiShoppingCart className='size-8' />
            <span className='text-xs'>Cart</span>
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        <Link to='/auth' className='absolute right-2'>
          <div className='border-gray-200 border-2 p-4 rounded-xl'><CgProfile className='size-8' /></div>
        </Link>
      </div>
      <div className='p-5'>
        {productData.map((item) => {
          return <div className='left text-xl sm:text-2xl lg:flex lg:flex-row'>
            <div className='  font-bold lg:w-1/2 flex flex-col  '>
              <img src={item.image} alt={item.title} className='w-11/12 item-center pt-10' /></div> <br />
            <div className='lg:w-1/2'>
              <p className='text-2xl lg:text-3xl'>{item.title}</p> <br />

              <div className="flex flex-row max-sm:flex-col max-sm:gap-4 max-sm:justify-start justify-between mt-5">
                <div className="flex flex-col max-sm:flex-row max-sm:gap-4 gap-2 items-center">
                  <p className="text-[27px] max-sm:text-[23px] text-gray-500 font-semibold">
                    Price
                  </p>
                  <p className="text-[23px]">Rs. {item.price} </p>
                </div>

                <div className="flex flex-col max-sm:flex-row max-sm:gap-4  gap-2 items-center">
                  <p className="text-[27px] max-sm:text-[23px] text-gray-500 font-semibold">
                    Color
                  </p>
                  <p className="text-[23px]">{item.color}</p>
                </div>
                <div className="flex flex-col max-sm:flex-row max-sm:gap-4  gap-2 items-center">
                  <p className="text-[27px] max-sm:text-[23px] text-gray-500 font-semibold">
                    Brand
                  </p>
                  <p className="text-[23px]">{item.brand} </p>
                </div>

                <div className="flex flex-col max-sm:flex-row max-sm:gap-4  gap-2 items-center">
                  <p className="text-[27px] max-sm:text-[23px] text-gray-500 font-semibold  mb-4 sm:mb-0">
                    Model
                  </p>
                  <p className="text-[23px]">{item.model}</p>
                </div>
              </div>

              <br />
              <br />
              <h2 className="text-[27px] max-sm:text-[23px] text-gray-500 font-semibold">Discription</h2>
              {item.description} <br />  <br />

              <div className="sm:flex sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="border-orange-400 border-2 px-4 sm:px-12 py-2  text-orange m-2 flex flex-row gap-2">
                  <CiShoppingCart className="size-8" />Add to Cart</button>
                <button
                  onClick={() => {
                    const exists = wishlistItems.some((product) => product.id === item.id);
                    if (!exists) {
                      dispatch(addToWishlist(item));
                    }
                  }}
                  className="px-4 py-2  m-2 flex flex-row text-orange gap-2"> <CiHeart className='size-8' /> Add to Wishlist </button>
              </div>
            </div>
          </div>

        })}</div>
    </div>
  )
}

export default DetailPage