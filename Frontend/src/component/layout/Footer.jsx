import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black">
      <footer className="lg:mx-auto lg:max-w-6xl footer p-7 text-yellow-500 ">
        <nav>
          <h6 className="footer-title">More from Bikroy</h6>
          <Link to="/sell-fast" className="link link-hover">
            Sell Fast
          </Link>
          <Link to="/membership" className="link link-hover">
            MemberShip
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Help & Support</h6>
          <Link to="/faq" className="link link-hover">
            FAQ
          </Link>
          <Link to="/contact" className="link link-hover">
            Contact Us
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Follow Bikroy</h6>
          <Link to="/blog" className="link link-hover">
            Blog
          </Link>
          <Link to="https://web.facebook.com" className="link link-hover">
            Facebook
          </Link>
          <Link to="https://web." className="link link-hover">
            Instagram
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">About Bikroy</h6>
          <Link to="/about" className="link link-hover">
            About us
          </Link>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <div className=" py-3 text-center">
        <p className="text-yellow-500 bodySmal">
          &copy; Jahid Hasan - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
