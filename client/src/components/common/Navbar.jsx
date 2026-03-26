import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiEdit, FiUser, FiLogOut, FiSettings, FiChevronDown } from "react-icons/fi";
import Search from "./Search";
import AuthModal from "../auth/AuthModal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const emailPrefix = localStorage.getItem("emailPrefix");
    const photo = localStorage.getItem("photoURL");
    
    setIsLoggedIn(!!token);
    if (userName) {
      setUserProfile(userName);
    } else if (emailPrefix) {
      setUserProfile(emailPrefix);
    }
    if (photo) {
      setPhotoURL(photo);
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

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("emailPrefix");
    localStorage.removeItem("userName");
    localStorage.removeItem("photoURL");
    setIsLoggedIn(false);
    setUserProfile("");
    setPhotoURL(null);
    navigate("/");
    window.location.reload();
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const isLandingPage = !isLoggedIn;
  const navBgClass = isLandingPage 
    ? "bg-[#f7f4ea]" 
    : (isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white");
  
  const outerBorderClass = isLandingPage 
    ? "border-b border-black" 
    : "border-b border-gray-200";
  
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
                <div className="relative user-dropdown">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white shadow-sm overflow-hidden border border-gray-200">
                      {photoURL ? (
                        <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <FiUser size={22} />
                      )}
                    </div>
                    <FiChevronDown className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[10002] animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Logged in as</p>
                        <p className="text-sm font-bold text-gray-800 truncate">{userProfile}</p>
                      </div>
                      
                      <Link 
                        to="/profile" 
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                      >
                        <FiSettings className="text-lg opacity-70" />
                        <span>Profile Settings</span>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors mt-1"
                      >
                        <FiLogOut className="text-lg opacity-70" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
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
