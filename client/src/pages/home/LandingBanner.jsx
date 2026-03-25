import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from '../../components/auth/AuthModal';

const LandingBanner = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#f7f4ea] flex flex-col md:flex-row items-center justify-center md:justify-between h-[calc(100vh-170px)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16 h-full py-2 md:py-0">
          
          <div className="max-w-3xl flex flex-col items-start w-full md:w-2/3 lg:w-[60%] z-10 -translate-x-12">
            <h1 className="text-[70px] md:text-[90px] lg:text-[106px] font-serif text-black leading-[0.95] tracking-tighter mb-8">
              Stories, <br/> <span className="whitespace-nowrap">ideas &amp; expression</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 mb-10 font-sans whitespace-nowrap">
              Dive into stories and ideas that inspire clarity and creativity
            </p>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-black text-white text-xl px-10 py-3 rounded-full hover:bg-gray-800 font-sans transition-colors"
            >
              Start reading
            </button>
          </div>

          <div className="hidden lg:flex lg:w-1/3 justify-end items-center h-full absolute -right-10 top-0 pr-4">
            <object
              data="/blog_image.svg"
              type="image/svg+xml"
              aria-label="Blog illustration"
              className="h-[85%] max-h-[550px] w-auto object-contain -translate-y-16 translate-x-8"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>

        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode="login" 
      />
    </>
  );
};

export default LandingBanner;
