import { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { links } from './data';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLinks(false);
    }
  }, [isAuthenticated]);

  const toggleLinks = () => {
    if (isAuthenticated) {
      setShowLinks(prev => !prev);
    }
  };

  return (
    <nav className="w-full z-50 bg-orange-900 shadow-lg sticky top-0">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo and Toggle Button */}
        <div className="flex items-center">
          <button
            className={`text-2xl text-black transition-transform transform hover:rotate-90 hover:text-gray-800 ${
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
          ref={linksContainerRef}
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
        
        {/* Login/Logout Button */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-white md:mr-2">
              {user?.email || 'User'}
              </span>
              <Link
                to="/Logout"
                className="px-4 py-2 bg-red-500 text-white rounded-md transition-colors hover:bg-red-600"
              >
                Logout
              </Link>
            </div>
            ) : (
            <Link
              to="/Login"
              className="px-4 py-2 bg-red-500 text-white rounded-md transition-colors hover:bg-red-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;