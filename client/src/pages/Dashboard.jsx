import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getcategories, getproducts, addToWishlist } from '../action'
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { FaSearch, FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import Footer from '../components/Footer';
const Dashboard = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    dispatch(getproducts());
    dispatch(getcategories());
  }, [dispatch]);

  // Combined filter (search + category)
  const filteredProducts = (products || [])
    .filter((item) =>
      selectedCategory === 'all' ? true : item.category === selectedCategory
    )
    .filter((item) =>
      item.title.toLowerCase().includes(searchProduct.toLowerCase())
    );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const cartItems = useSelector((state) => state.cartItems);
  const wishlistItems = useSelector((state) => state.wishlistItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishCount = wishlistItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      {/* Top bar */}
      <div className='flex flex-wrap gap-2 items-center px-4 sm:px-10 py-6'>
       <img src="../Logo.webp" alt="Logo" width="150px" height="50px" />
        <input
          placeholder='Search for Product'
          className='border-black border-2 text-xl rounded-xl px-4 py-2 mb-4 sm:mb-0 flex-1 min-w-[200px]'
          value={searchProduct}
          onChange={(e) => {
            setSearchProduct(e.target.value);
            setCurrentPage(1); // reset to first page on new search
          }}
        />
         <div className='flex flex-row gap-2'>
        <Link to='/wishlist' className='relative'>
          <div className='bg-black text-white p-4 rounded-xl flex items-center gap-1'>
            <CiHeart  className='size-8'/>
            <span className='text-xs'>Wishlist</span>
          </div>
          {wishCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishCount}
            </span>
          )}
        </Link>
        <Link to='/cart' className='relative'>
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
        <Link to='/auth'>
          <div className='border-gray-200 border-2 p-4 rounded-xl'><CgProfile className='size-8'/></div>
        </Link>
      </div></div>

      {/* Category dropdown */}
      <div className="px-4 sm:px-10">
        <div className="relative">
          <button
            className="text-2xl flex flex-row items-center gap-2"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <FaBars /> All Categories
          </button>

          {showDropdown && (
            <div className="absolute mt-2 text-lg bg-white border rounded shadow w-40 z-10">
              <div
                className={`px-4 py-2 hover:bg-gray-200 cursor-pointer capitalize ${selectedCategory === 'all' ? 'bg-gray-100 font-semibold' : ''}`}
                onClick={() => {
                  setSelectedCategory('all');
                  setShowDropdown(false);
                  setCurrentPage(1);
                }}
              >
                All
              </div>
              {categories.map((cat) => (
                <div
                  key={cat}
                  className={`px-4 py-2 hover:bg-gray-200 cursor-pointer capitalize ${selectedCategory === cat ? 'bg-gray-100 font-semibold' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowDropdown(false);
                    setCurrentPage(1);
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Products List */}
        <div className="mt-6">
          <h2 className="text-3xl font-bold mb-4 capitalize">
            {selectedCategory} Products
          </h2>
          {currentProducts.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((item) => (
                <li key={item.id} className="flex flex-col justify-between p-4 border rounded shadow hover:shadow-md h-full">
                  <Link to={`/${item.id}/${item.color}/${item.price}/${item.brand}`} className="flex-grow">
                    <img src={item.image} alt={item.title} width='200px' height='200px' className="mx-auto" />
                    <h3 className="mt-2 font-semibold text-lg">{item.title}</h3>
                    <p className='text-xl font-bold'>Rs. {item.price}</p>
                  </Link>

                  <div className="mt-4">
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="border-orange-400 border-2 px-4 sm:px-12 py-2 text-orange m-2 flex flex-row gap-2 items-center w-full justify-center"
                    >
                      <CiShoppingCart className="size-6" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        const exists = wishlistItems.some((product) => product.id === item.id);
                        if (!exists) {
                          dispatch(addToWishlist(item));
                        }
                      }}
                      className="px-4 py-2 m-2 flex flex-row text-orange gap-2 items-center w-full justify-center"
                    >
                      <CiHeart className='size-6' />
                      Add to Wishlist
                    </button>

                  </div>
                </li>

              ))}
            </ul>
          ) : (
            <p className="text-xl text-red-600">No products found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center text-xl lg:text-3xl space-x-2 mt-6 pb-12">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 border rounded ${currentPage === 1 ? "bg-white cursor-not-allowed" : "bg-Navbar"}`}
            >
              <MdKeyboardArrowRight className="rotate-180" />
            </button>

            <button className="px-3 py-2 border rounded">{currentPage}</button>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 border rounded ${currentPage === totalPages ? "bg-Navbar cursor-not-allowed" : "bg-Navbar"}`}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        )}
      </div>
    
    <Footer />
    </div>
    
  );
};

export default Dashboard;
