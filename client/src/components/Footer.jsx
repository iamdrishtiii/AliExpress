import React from 'react';
import {
    FaPhoneAlt,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="absolute bottom-0 w-full bg-white">
            <footer className="border-t border-black mt-1 text-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-[16px]">
                    {/* Logo and Contact */}
                    <div>
                        <div><img src="../Logo.webp" alt="" width="150px" /></div>
                        <p className="mb-2">
                            AliExpress is a global online retail marketplace that offers a wide range of products at competitive prices, primarily sourced from Chinese manufacturers and sellers.
                        </p>
                        <div className="flex items-center gap-2 p-2 border rounded-md w-fit">
                            <FaPhoneAlt className="text-lg" />
                            <div>
                                <p className="text-xs text-gray-500">Got Questions? Call us 24/7</p>
                                <a href="tel:+0123456789" className="text-blue-500 font-semibold">
                                    +0123 456 789
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="font-semibold mb-3 md:mt-8">Useful Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Our Services</a></li>
                            <li><a href="#">How to Shop</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="font-semibold mb-3 md:mt-8">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><a href="#">Payment Methods</a></li>
                            <li><a href="#">Money-back guarantee</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">Shipping</a></li>
                            <li><a href="#">Terms and Conditions</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* My Account */}
                    <div>
                        <h3 className="font-semibold mb-3 md:mt-8">My Account</h3>
                        <ul className="space-y-2">
                            <li><Link to="/auth">Sign In</Link></li>
                            <li><Link to="/cart">View Cart</Link></li>
                            <li><Link to="/wishlist">My Wishlist</Link></li>
                            <li><a href="#">Track My Order</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t px-4 py-4 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto text-sm">
                    <p className="text-gray-500">© 2025 AliExpress. All Rights Reserved.</p>
                    <div className="flex space-x-4 mt-2 md:mt-0">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedinIn /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;