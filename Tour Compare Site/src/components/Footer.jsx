import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">TravelCompare</h3>
          <p className="text-gray-400">
            Find and compare the best travel packages for your next adventure.
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/search" className="text-gray-400 hover:text-white transition-colors">Search</Link></li>
            <li><Link to="/compare" className="text-gray-400 hover:text-white transition-colors">Compare</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4">Account</h4>
          <ul className="space-y-2">
            <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
            <li><Link to="/signup" className="text-gray-400 hover:text-white transition-colors">Sign Up</Link></li>
            <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors">Admin Panel</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center">
              <span className="mr-2">📧</span> info@travelcompare.com
            </li>
            <li className="flex items-center">
              <span className="mr-2">📱</span> +91 982 235 2674
            </li>
            <li className="flex items-center">
              <span className="mr-2">🌎</span> 123 Travel Street, Chennai
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">© 2023 TravelCompare. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
