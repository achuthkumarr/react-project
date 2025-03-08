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
        <nav className=" shadow-md bg-auto  top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo and Toggle Button */}
        <div className="flex items-center">
          <button
            className=" text-2xl transition-transform transform hover:rotate-90 hover:text-blue-200"
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
                  className=" px-4 py-2 text-black capitalize font-bold transition-colors hover:text-blue-300">
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
                className="text-primary-500 transition-colors hover:text-blue-300">
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