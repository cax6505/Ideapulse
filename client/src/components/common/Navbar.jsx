import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


import { FiEdit } from "react-icons/fi";
import Search from "./Search";
import AuthModal from "../auth/AuthModal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

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
    navigate("/");
    window.location.reload();
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const isLandingPage = !isLoggedIn;
  const navBgClass = isLandingPage ? "bg-[#f7f4ea]" : (isScrolled ? "bg-white shadow-sm" : "bg-white");
  const outerBorderClass = isLandingPage ? "border-b border-black" : "border-b border-gray-200";
  
  const outerPadding = isLandingPage ? "pt-5 px-6 md:px-12 lg:px-16" : (isScrolled ? "pt-3 px-6 md:px-12 lg:px-16" : "pt-5 px-6 md:px-12 lg:px-16");
  const innerClass = isLandingPage ? "pb-5" : (isScrolled ? "pb-3" : "pb-5");

  return (
    <>
      <header
        className={`w-full sticky top-0 transition-all duration-300 ease-in z-[10001] ${navBgClass} ${outerBorderClass} ${outerPadding}`}
      >
        <div className={`flex items-center justify-between max-w-7xl mx-auto w-full ${innerClass}`}>
          
          {/* Left: Hamburger & Logo */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-black hover:opacity-80 transition-opacity"
            >
              <span className="font-serif text-3xl tracking-tight hidden sm:block">BlogVerse</span>
            </Link>
          </div>

          {/* Right: Write, Profile/Login */}
          <div className="flex items-center gap-4 md:gap-6">
            {isLoggedIn ? (
              <div className="flex items-center gap-6">
                <Link to="/write" className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-black font-medium transition-colors">
                  <FiEdit className="text-xl opacity-80" />
                  <span>Write</span>
                </Link>
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
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => openAuthModal('login')}
                  className="text-sm font-semibold text-gray-700 hover:text-black transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="text-sm font-semibold text-white bg-gray-900 px-6 py-2.5 rounded-full hover:bg-black transition-all duration-300 shadow-sm"
                >
                  Get started
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />
    </>
  );
};

export default Navbar;
