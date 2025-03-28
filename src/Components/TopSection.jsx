import React from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { social } from './data';

const TopSection = () => {
  return (
    <div className="hidden md:block">
      <div className="flex justify-between items-center" style={{ backgroundColor: "#123456" }}>
        <Link to="tel:+919538056725">
          <div className="flex items-center gap-2 ml-8">
            <FaPhoneAlt className="text-white text-xl" />
            <span className="text-white text-3xl md:text-xl font-cormorant_infant cursor-pointer">
            +91 95380 56725
            </span>
          </div>
        </Link>
        <ul className="flex gap-4 p-6  before:m-0 rounded-tl-md rounded-bl-[3rem]" style={{ backgroundColor: "#654" }}>
          {social.map(({ id, url, icon }) => (
            <li key={id}>
              <a href={url} className="text-white transition-colors text-xl hover:text-blue-300">
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopSection;
