import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { HiOutlineLightBulb } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import Search from "./Search";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState("");

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



  return (
    <header
      className={`w-full py-3 transition-all duration-300 ease-in z-[10001] bg-white border-b border-gray-100 ${
        isScrolled ? "fixed top-0 left-0 shadow-sm px-4 md:px-8" : "px-4 md:px-8"
      }`}
    >
      <div className="flex items-center justify-between">
        
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-4">

          
          <Link
            to="/"
            className="flex items-center gap-2 text-black hover:opacity-80 transition-opacity"
          >
            <div className="bg-gray-900 text-white p-1 rounded-lg flex items-center justify-center">
              <HiOutlineLightBulb className="text-lg" />
            </div>
            <span className="font-bold font-serif text-2xl tracking-tight hidden sm:block">BlogVerse</span>
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


    </header>
  );
};

export default Navbar;
