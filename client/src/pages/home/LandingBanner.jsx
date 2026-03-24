import React from 'react';
import { Link } from 'react-router-dom';

const LandingBanner = () => {
  return (
    <div className="w-full bg-white flex items-center justify-between border-b pb-24 pt-16">
      <div className="max-w-3xl flex flex-col items-start px-4 md:px-0">
        <h1 className="text-6xl md:text-8xl font-bold font-serif text-gray-900 leading-tight mb-8">
          BlogVerse <br/> stories & ideas
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-10">
          A place to read, write, and deepen your understanding
        </p>
        <Link 
          to="/auth" 
          className="bg-gray-900 text-white text-xl px-10 py-3 rounded-full hover:bg-black font-medium transition-colors"
        >
          Start reading
        </Link>
      </div>
      <div className="hidden lg:block lg:w-1/3">
        {/* Decorative elements representing creativity mapping mimicking the reference image */}
        <div className="w-full h-80 bg-green-100 rounded-3xl opacity-50 relative overflow-hidden flex items-center justify-center border-2 border-green-200">
           <span className="text-6xl animate-pulse">✨</span>
           <span className="text-6xl absolute top-6 right-10">🚀</span>
        </div>
      </div>
    </div>
  );
};

export default LandingBanner;
