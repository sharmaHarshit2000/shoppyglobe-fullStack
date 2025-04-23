import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand / About */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">ShoppyGlobe</h3>
            <p className="text-sm leading-relaxed">
              Discover top products, seamless checkout, and an unmatched shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
              <li><Link to="/checkout" className="hover:text-white">Checkout</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white"><FaFacebookF /></a>
              <a href="#" className="hover:text-white"><FaInstagram /></a>
              <a href="#" className="hover:text-white"><FaTwitter /></a>
              <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ShoppyGlobe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
