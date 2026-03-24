import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import Search from "./Search";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("emailPrefix");
    setIsLoggedIn(!!token);
    if (email) {
      const username = email.split('@')[0];
      setUserProfile(username);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("emailPrefix");
    setIsLoggedIn(false);
    setUserProfile("");
    navigate("/auth");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`w-full py-3 transition-all duration-300 ease-in z-[10001] bg-white border-b border-gray-100 ${
        isScrolled ? "fixed top-0 left-0 shadow-sm px-4 md:px-8" : "px-4 md:px-8"
      }`}
    >
      <div className="flex items-center justify-between">
        
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-4">
          <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-black py-2">
            <FaBars size={22} className="opacity-80 font-light" />
          </button>
          
          <Link
            to="/"
            className="flex items-center gap-2 text-black hover:opacity-80 transition-opacity"
          >
            <div className="bg-gray-900 text-white p-1 rounded-lg flex items-center justify-center">
              <HiOutlineLightBulb className="text-lg" />
            </div>
            <span className="font-bold font-serif text-2xl tracking-tight hidden sm:block">IdeaPulse</span>
          </Link>
        </div>

        {/* Middle: Search Bar */}
        <div className="hidden md:flex flex-grow max-w-sm mx-4">
          <Search />
        </div>

        {/* Right: Write, Get App, Profile/Login */}
        <div className="flex items-center gap-4 md:gap-6">
          
          <Link to="/write" className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-black font-medium transition-colors">
            <FiEdit className="text-xl opacity-80" />
            <span>Write</span>
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
              <span className="text-sm font-semibold text-gray-700 hidden lg:block">
                {userProfile}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-gray-600 hover:text-black transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
               <Link
                to="/auth"
                className="text-sm font-semibold text-gray-600 hover:text-black transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-white shadow-xl z-50 p-6 border-b flex flex-col gap-4">
           {/* Mobile Search */}
          <div className="md:hidden w-full mb-2">
             <Search />
          </div>

          <Link to="/" className="text-gray-800 font-semibold hover:text-blue-600 px-2 py-1">
            Homepage
          </Link>
          <Link to="/about" className="text-gray-600 font-semibold hover:text-gray-900 px-2 py-1">
            About us
          </Link>
          <Link to="/write" className="flex items-center gap-2 text-gray-600 font-semibold hover:text-gray-900 px-2 py-1">
             <FiEdit /> Write
          </Link>
          <Link to="/blogs" className="text-gray-600 font-semibold hover:text-gray-900 px-2 py-1">
            Read Blogs
          </Link>

          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
            {isLoggedIn ? (
              <>
                <span className="text-gray-500 font-medium px-2 py-1">Logged in as {userProfile}</span>
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="w-full text-center px-5 py-2.5 text-sm font-semibold text-white bg-gray-900 rounded-full"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
