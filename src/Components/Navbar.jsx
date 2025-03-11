import { useState, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { links } from './data';
import { Link } from 'react-router-dom';

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className="w-full z-50 bg-orange-800 shadow-lg sticky top-0">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo and Toggle Button */}
        <div className="flex items-center">
          <button
            className="text-2xl text-gray-800 transition-transform transform hover:rotate-90 hover:text-gray-600"
            onClick={toggleLinks}
          >
            <FaBars />
          </button>
        </div>

        {/* Navigation Links */}
        <div
          ref={linksContainerRef}
          className={`overflow-hidden transition-all duration-300 ${
            showLinks ? 'h-auto' : 'h-0'
          } md:max-h-full md:flex`}
        >
          <ul className="flex flex-col md:flex-row justify-self-auto md:gap-6">
            {links.map(({ id, url, text }) => (
              <li key={id}>
                <Link
                  to={url}
                  className="px-4 py-2 text-gray-800 capitalize justify-center font-bold transition-colors hover:text-gray-600"
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* login button */}
        <div className="flex items-center">
          <Link
            to="/Login"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md transition-colors hover:bg-gray-400"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;