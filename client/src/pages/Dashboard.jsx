import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getcategories, getproducts, addToWishlist } from '../action';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { FaBars } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const productsPerPage = 12;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const cartItems = useSelector((state) => state.cartItems);
  const wishlistItems = useSelector((state) => state.wishlistItems);

  useEffect(() => {
    dispatch(getproducts());
    dispatch(getcategories());
  }, [dispatch]);

  const filteredProducts = (products || [])
    .filter((item) => selectedCategory === 'all' || item.category === selectedCategory)
    .filter((item) => item.title.toLowerCase().includes(searchProduct.toLowerCase()));

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishCount = wishlistItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen pb-24  pb-[1150px] md:pb-[610px] lg:pb-[500px]">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50 pt-4 pb-5">
        <div className="flex flex-wrap justify-between items-center px-6 py-4">
          <img src="../Logo.webp" alt="Logo" className="w-36 pl-12" />
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 mx-4 border rounded-full px-6 py-2 text-lg focus:outline-none shadow"
            value={searchProduct}
            onChange={(e) => {
              setSearchProduct(e.target.value);
              setCurrentPage(1);
            }}
          />
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

      {/* Category Filter */}
      <div className="px-6 py-4 relative">
        <button
          className="flex items-center gap-2 text-lg font-semibold"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FaBars /> Categories
        </button>
        {showDropdown && (
          <div className="absolute mt-2 bg-white border rounded shadow-md w-48 z-10">
            <div
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${selectedCategory === 'all' ? 'bg-gray-100 font-semibold' : ''}`}
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
                className={`px-4 py-2 cursor-pointer capitalize hover:bg-gray-200 ${selectedCategory === cat ? 'bg-gray-100 font-semibold' : ''}`}
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

      {/* Product Grid */}
      <div className="px-6 mt-4">
        <h2 className="text-xl font-semibold mb-4 capitalize">{selectedCategory} Products</h2>
        {currentProducts.length ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentProducts.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-100 p-4 flex flex-col justify-between">
                <Link to={`/${item.id}/${item.color}/${item.price}/${item.brand}`}>
                  <img src={item.image} alt={item.title} className="w-44 h-48  mb-2" />
                  <h3 className="font-semibold text-base mb-1 line-clamp-3">{item.title}</h3>
                  <p className="font-bold text-orange-500">₹{item.price}</p>
                </Link>
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    className="border border-orange-500 text-orange-500 rounded-lg py-1 hover:bg-orange-50"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <CiShoppingCart /> Add to Cart
                    </div>
                  </button>
                  <button
                    className="border border-pink-400 text-pink-500 rounded-lg py-1 hover:bg-pink-50"
                    onClick={() => {
                      const exists = wishlistItems.some((product) => product.id === item.id);
                      if (!exists) dispatch(addToWishlist(item));
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <CiHeart /> Add to Wishlist
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500 text-lg">No products found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            className="p-2 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowRight className="rotate-180" />
          </button>
          <span className="px-4 font-medium">{currentPage}</span>
          <button
            className="p-2 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
