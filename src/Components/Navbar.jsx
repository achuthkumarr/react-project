import { useState, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { links, social } from './data';
import { Link } from 'react-router-dom';

function Navbar() {
    const [showLinks, setShowLinks] = useState(false);
    const linksContainerRef = useRef(null);

    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };

    return (
        <nav className="bg-black shadow-md text-white">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo and Toggle Button */}
        <div className="flex items-center">
          <button
            className="text-primary-500 text-2xl transition-transform transform hover:rotate-90 hover:text-amber-200"
            onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>

        {/* Navigation Links */}
        <div
          ref={linksContainerRef}
          className={`overflow-hidden transition-all duration-300 ${
            showLinks ? 'h-auto' : 'h-0'
          } md:max-h-full md:flex`}>
          <ul className="flex flex-col md:flex-row md:gap-6">
            {links.map(({ id, url, text }) => (
              <li key={id}>
                <Link
                  to={url}
                  className="block px-4 py-2 text-gray-300 capitalize transition-colors hover:text-amber-300">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Icons */}
        <ul className="hidden md:flex gap-4">
          {social.map(({ id, url, icon }) => (
            <li key={id}>
              <a
                href={url}
                className="text-primary-500 transition-colors hover:text-primary-300">
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;