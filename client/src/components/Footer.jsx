import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 py-10 gap-8 border-b border-gray-200 pb-6 mt-6 mb-10">
        <div>
          <h2 className="text-3xl font-bold">FabEstate</h2>
          <p className="text-gray-200 mt-2 text-sm">Bringing you the best real estate deals with modern solutions.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Company</h3>
          <ul className="text-gray-200 text-sm space-y-2">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Press</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <ul className="text-gray-200 text-sm space-y-2">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Contact Support</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-gray-200 hover:text-white text-xl"><FaFacebookF /></a>
            <a href="#" className="text-gray-200 hover:text-white text-xl"><FaTwitter /></a>
            <a href="#" className="text-gray-200 hover:text-white text-xl"><FaInstagram /></a>
            <a href="#" className="text-gray-200 hover:text-white text-xl"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      <div className="flex flex-col my-10 md:flex-row justify-between items-center mt-6 text-gray-200 text-sm">
        <p>&copy; 2025 FabEstate. All rights reserved.</p>
        <nav className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Cookie Policy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
