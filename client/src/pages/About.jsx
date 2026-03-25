import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-12 leading-tight">
        A platform for <br/> <span className="text-blue-600">thoughtful voices.</span>
      </h1>
      
      <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed space-y-8">
        <p>
          Welcome to <span className="font-bold text-gray-900">BlogVerse</span>, your one-stop destination for discovering and exploring a wide variety of blogs across numerous topics. 
        </p>
        <p>
          Whether you&apos;re interested in technology, lifestyle, entrepreneurship, health, or creativity, BlogVerse offers something for everyone. Our platform allows users to not only read and view blogs but also dive deep into a diverse collection of content written by passionate bloggers from around the world.
        </p>
        <p>
          With easy navigation and a user-friendly interface, BlogVerse helps you stay informed, inspired, and entertained. Explore now and find your next favorite topic today!
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 border-t pt-12">
        <div>
           <h4 className="text-2xl font-bold mb-2">1M+</h4>
           <p className="text-gray-500 text-sm">Monthly Readers</p>
        </div>
        <div>
           <h4 className="text-2xl font-bold mb-2">50K+</h4>
           <p className="text-gray-500 text-sm">Active Authors</p>
        </div>
        <div>
           <h4 className="text-2xl font-bold mb-2">100+</h4>
           <p className="text-gray-500 text-sm">Topics Covered</p>
        </div>
      </div>
    </div>
  );
};

export default About;
