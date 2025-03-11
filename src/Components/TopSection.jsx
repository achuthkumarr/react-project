import React from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TopSection = () => {
  return (
    <div className="hidden md:block">
      <div className="flex justify-between items-center p-2 md:p-2" style={{ backgroundColor: "#123456" }}>
        <Link to="tel:+919538056725">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-white text-lg" />
            <span className="text-white text-sm md:text-base font-cormorant_infant">
            +91 95380 56725
            </span>
          </div>
        </Link>
        <div className="flex gap-4 p-2  before:m-0 rounded-tl-md rounded-bl-3xl" style={{ backgroundColor: "#654" }}>
        <Link
            to="https://in.linkedin.com/in/achuth-kumar-r-716992181"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg"
          >
            <FaLinkedinIn />
          </Link>
          <Link
            to="https://www.instagram.com/achuthkr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg"
          >
            <FaInstagram />
          </Link>
          <Link
            to="https://x.com/AchuthKumar11"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg"
          >
            <FaXTwitter />
          </Link>
          {/* <Link
            to="https://wa.me/message/LBL4KXWKVTZBI1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg"
          >
            <FaWhatsapp />
          </Link> */}
          <Link
            to="https://www.youtube.com/@achuthkumar9959"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg"
          >
            <FaYoutube />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
