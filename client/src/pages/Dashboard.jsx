import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getcategories, getproducts, addToWishlist } from '../action';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { FaBars } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FaLongArrowAltDown } from 'react-icons/fa';
import { toast } from 'react-toastify'

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [searchProduct, setSearchProduct] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [quantity, setQuantity] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const productsPerPage = 12;
  const token = localStorage.getItem("token")

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories)
  const cartItems = useSelector((state) => state.cartItems);
  const wishlistItems = useSelector((state) => state.wishlistItems);

  useEffect(() => {
    dispatch(getproducts());
    dispatch(getcategories());
  }, [dispatch]);

  useEffect(() => {
    if ((products || []).length > 0 && (categories || []).length > 0) {
      setLoading(false);
    }
  }, [products, categories]);

  const filteredProducts = (products || [])
    .filter((item) => selectedCategory === 'all' || item.category === selectedCategory)
    .filter((item) => ((item?.title || '').toLowerCase()).includes(searchProduct.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'lowToHigh') return a.price - b.price;
      if (sortOrder === 'highToLow') return b.price - a.price;
      return 0;
    });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const cartCount = (cartItems || []).reduce((total, item) => total + item.quantity, 0);
  const wishCount = (wishlistItems || []).reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen  bg-slate-100 pb-24 pb-[1150px] md:pb-[610px] lg:pb-[500px]">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 py-4 mb-4 sm:px-20">
        <div className="flex flex-wrap justify-between items-center px-2 sm:px-6">
          <img src="../Logo.webp" alt="Logo" className="w-36 h-16 sm:h-20 sm:w-48 sm:pl-12" />

          <div className="flex flex-col sm:flex-row rounded-full border border-gray-50 gap-2 shadow flex-1 sm:ml-8 mb-4 sm:mt-3">
            <div className="flex flex-row text-lg flex-1 bg-white relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 pl-1 sm:px-4 py-2 text-lg rounded-full bg-white"
                value={inputValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setInputValue(value);

                  if (value.trim()) {
                    // Filter products for suggestions
                    const matched = products
                      .filter(item => String(item?.title || '').toLowerCase()
                        .includes(String(value || '').toLowerCase())
                      )
                      .slice(0, 5); // Limit to 5 suggestions
                    setSuggestions(matched);
                  } else {
                    setSuggestions([]);
                  }
                }}
              />

              {suggestions.length > 0 && (
                <div className="absolute mt-12 bg-white shadow-lg rounded-lg w-full max-w-fit z-50 border border-gray-200">
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-1 cursor-pointer line-clamp-1 hover:bg-gray-100"
                      onClick={() => {
                        setInputValue("");
                        setSearchProduct(item.title);
                        setSuggestions([]);
                      }}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => {
                  setInputValue("")
                  setSuggestions("")
                  setSearchProduct(inputValue);
                  setCurrentPage(1);
                }}
                className="hover:bg-gray-100 rounded-full pr-3 sm:px-5 transition"
              >
                <FaSearch className="text-xl" />
              </button>
            </div>
          </div>



          <div className="flex justify-end gap-3 mx-3 sm:ml-12 lg:ml-8">
            {/* Wishlist Icon */}
            <Link to="/wishlist" className="relative">
              <CiHeart className="text-3xl " />
              {wishCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <CiShoppingCart className="text-3xl" />
              {token ? (<div>{cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}</div>) : (
                <div></div>
              )}
            </Link>

            {/* Authentication Profile Icon */}
            <Link to="/auth" className='pl-2'>
              <CgProfile className="text-3xl" />
            </Link>
          </div>
        </div>
      </header>
      <div className=' sm:px-20'>
        <div className='flex flex-wrap '>
          {/* Category Filter */}
          <div className="px-6 py-4 relative">
            <button
              className="flex items-center gap-2 text-lg  text-gray-600 font-semibold"
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
                    key={cat._id}
                    className={`px-4 py-2 cursor-pointer capitalize hover:bg-gray-200 ${selectedCategory === cat.categories ? 'bg-gray-100 font-semibold' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat.categories);
                      setShowDropdown(false);
                      setCurrentPage(1);
                    }}
                  >
                    {cat.categories}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="px-6 my-4">
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="default">Sort by Price</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>

        </div>
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="px-6 mt-4 ">
            {/* Product Grid */}
            <h2 className="text-xl font-semibold mb-4 capitalize text-gray-600">{selectedCategory} Products</h2>
            {/* Best Deals Section */}
            {filteredProducts.some(item => item.discount) && (
              <div className="px-6 mt-6 mb-8 bg-white">
                <h2 className="text-2xl font-semibold py-4 text-orange-600">Best Deals</h2>
                <div className="overflow-x-auto flex gap-6 pb-4">
                  {filteredProducts.slice(0, 10)
                    .filter((item) => item.discount)
                    .map((item) => {
                      const discountedPrice = Math.round(item.price - (item.price * item.discount / 100));
                      return (
                        <div
                          key={item.id}
                          className="min-w-[200px] bg-white border hover:scale-90 rounded-lg p-4 shadow hover:shadow-md "
                        >
                          <Link to={`/${item.id}/${item.color}/${item.price}/${item.brand}`}>
                            <img src={item.image} alt={item.title} className="h-36 w-full object-contain mb-2" />
                            <h3 className="font-semibold text-base mb-1 line-clamp-2">{item.title}</h3>
                          </Link>
                          <div className="text-sm">
                            <div className='flex flex-wrap gap-2'>
                              <p className="text-gray-500 line-through pl-2">₹{item.price}</p>
                              <p className="text-green-600 font-semibold flex flex-wrap"><FaLongArrowAltDown className='h-5' />{item.discount}% OFF</p></div>
                            <p className="text-black font-bold pl-2">  ₹{discountedPrice}</p>

                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {currentProducts.length ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {currentProducts.map((item) => {
                  const discountedPrice = Math.round(item.price - (item.price * item.discount / 100));
                  return (
                    <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-md hover:scale-105 p-2 flex flex-col justify-between" data-testid="card">
                      <Link to={`/${item.id}/${item.color}/${item.price}/${item.brand}`}>
                        <div className=' flex justify-center items-center'><img src={item.image} alt={item.title} className="h-40 w-40 mb-2" /></div>
                        <h3 className="font-semibold text-lg mb-1 line-clamp-2" data-testid="title">{item.title}</h3>
                        <p className="text-sm text-gray-800 ">Color : {item.color}</p>
                        <div className="mt-2">
                          {item.discount ? (
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <p className="text-gray-500 line-through">₹{item.price}</p>
                                <p className="text-green-600 font-semibold">{item.discount}% OFF</p>
                              </div>
                              <p className="font-bold text-orange-500">
                                ₹{Math.round(item.price - (item.price * item.discount / 100))}
                              </p>
                            </div>
                          ) : (
                            <p className="font-bold text-orange-500">₹{item.price}</p>
                          )}
                        </div>

                      </Link>


                      <div className="mt-4 flex flex-col gap-2">

                        <button
                          className="border text-red-500 rounded-lg py-1 px-1 hover:bg-pink-100 absolute right-2 top-2 "
                          onClick={() => {
                            const exists = wishlistItems.some((product) => product.id === item.id);
                            if (!exists) dispatch(addToWishlist(item));
                          }}
                        >
                          <CiHeart className='size-6' />
                        </button>
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4 mb-4">
                          <button
                            onClick={() =>
                              setQuantity((prev) => ({
                                ...prev,
                                [item.id]: Math.max(1, (prev[item.id] || 1) - 1),
                              }))
                            }
                            className="px-3 py-1 border rounded font-bold text-lg hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="text-lg font-semibold">{quantity[item.id] || 1}</span>
                          <button
                            onClick={() =>
                              setQuantity((prev) => ({
                                ...prev,
                                [item.id]: (prev[item.id] || 1) + 1,
                              }))
                            }
                            className="px-3 py-1 border rounded font-bold text-lg hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>



                        <button
                          className="flex-1 bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-orange-400 flex items-center justify-center gap-2"
                          onClick={() => {
                            if (!token) {
                              navigate("/auth");
                              return;
                            }
                            const itemWithQuantity = { ...item, quantity: quantity[item.id] || 1 };
                            dispatch(addToCart(itemWithQuantity));
                            setQuantity((prev) => ({ ...prev, [item.id]: 1 }));
                            navigate('/cart');
                          }}
                        >
                          Buy Now
                        </button>


                        <button
                          className="border border-orange-500 text-orange-500 rounded-lg py-1 hover:bg-orange-50"
                          onClick={() => {
                            if (!token) {
                              alert("You need to first login");
                              return;
                            }
                            const itemWithQuantity = { ...item, quantity: quantity[item.id] || 1 };
                            dispatch(addToCart(itemWithQuantity));
                            setQuantity((prev) => ({ ...prev, [item.id]: 1 }));
                          }}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <CiShoppingCart /> Add to Cart
                          </div>
                        </button>



                      </div>

                    </div>
                  )
                })}
              </div>
            )
              : (
                <p className="text-center text-red-500 text-lg">No products found.</p>
              )}
          </div>
        )}
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
    </div>
  );
};

export default Dashboard;
