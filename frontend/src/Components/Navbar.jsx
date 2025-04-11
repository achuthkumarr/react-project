import { useState, useRef, useEffect } from 'react';
import { FaBars, FaCaretDown } from 'react-icons/fa';
import { links } from './data';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userDropdownRef = useRef(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isActiveLink = (path) => location.pathname === path;

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLinks(false);
      setShowUserDropdown(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleLinks = () => {
    if (isAuthenticated) {
      setShowLinks(prev => !prev);
    }
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(prev => !prev);
  };

  return (
    <nav className="w-full z-50 bg-[#473c44] shadow-lg sticky top-0">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo and Toggle Button */}
        <div className="flex items-center">
          <button
            className={`text-2xl text-[#f7f7f7] transition-transform transform hover:rotate-90 hover:text-[#f5f5f5] ${
              !isAuthenticated ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={toggleLinks}
            disabled={!isAuthenticated}
          >
            <FaBars />
          </button>
        </div>
        
        {/* Navigation Links */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isAuthenticated && showLinks ? 'h-auto' : 'h-0'
          } md:max-h-full md:flex`}
        >
          <ul className="flex flex-col md:flex-row justify-self-auto md:gap-6">
            {links.map(({ id, url, text }) => (
              <li key={id}>
                <Link
                  to={url}
                  className={`px-4 py-2 text-white capitalize justify-center font-bold transition-colors hover:text-gray-600 ${
                    !isAuthenticated ? 'pointer-events-none opacity-50' : ''
                  }`}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* User Account with Dropdown */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <div className="relative" ref={userDropdownRef}>
              <button 
                onClick={toggleUserDropdown}
                className="flex items-center space-x-1 text-white px-4 py-2 rounded-md hover:bg-orange-800 transition-colors"
              >
                <span>{user?.email || 'User'}</span>
                <FaCaretDown className={`ml-1 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown menu */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <Link
                    to="/Logout"
                    className="block px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex justify-center rounded-full  items-center ">
              <Link
                to="/Register"
                className="bg-[#473c44] text-white px-4 py-2 font-medium rounded-full hover:bg-[#302c2f] transition-colors mr-2"
              >
                Sign Up
              </Link>
              <Link
                to="/Login"
                className="bg-[#473c44] text-white px-4 py-2 font-medium rounded-full hover:bg-[#302c2f] transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;