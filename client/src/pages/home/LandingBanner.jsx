import React, { useState } from 'react';
import AuthModal from '../../components/auth/AuthModal';

const LandingBanner = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#f7f4ea] flex flex-col md:flex-row items-center justify-center md:justify-between h-[calc(100vh-100px)] relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16 h-full py-2 md:py-0">
          
          <div className="max-w-3xl flex flex-col items-start w-full md:w-2/3 lg:w-[60%] z-10 lg:-translate-x-12">
            <h1 className="text-[60px] md:text-[80px] lg:text-[106px] font-serif text-black leading-[0.95] tracking-tighter mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
              Stories, <br/> <span className="whitespace-nowrap">ideas &amp; expression</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 mb-10 font-sans max-w-xl animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
              Dive into stories and ideas that inspire clarity and creativity. A space for thinkers and creators.
            </p>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-black text-white text-xl px-12 py-4 rounded-full hover:bg-gray-800 font-bold transition-all shadow-xl hover:scale-105 active:scale-95 animate-in fade-in zoom-in-95 duration-700 delay-300"
            >
              Start reading
            </button>
          </div>

          <div className="hidden lg:flex lg:w-1/3 justify-end items-center h-full absolute -right-10 top-0 pr-4 animate-in fade-in slide-in-from-right-8 duration-1000">
            <object
              data="/blog_image.svg"
              type="image/svg+xml"
              aria-label="Blog illustration"
              className="h-[85%] max-h-[550px] w-auto object-contain -translate-y-16 translate-x-8 transition-all"
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
