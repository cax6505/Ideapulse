import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ blogs }) => {
  const featuredBlog = blogs[0];
  const otherFeatured = blogs.slice(1, 5);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Featured Post */}
      <Link 
        to={`/blogs/${featuredBlog.id}`} 
        className="block flex-1 group overflow-hidden rounded-2xl relative shadow-lg h-[500px]"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${featuredBlog.image})` }}
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-white uppercase border border-white/40 rounded-full bg-white/10 backdrop-blur-sm">
            {featuredBlog.category || 'Featured'}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {featuredBlog.title}
          </h1>
        </div>
      </Link>

      {/* Other Featured Posts */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-gray-900 border-b pb-2">Other featured posts</h3>
        <div className="flex flex-col gap-6">
          {otherFeatured.map(blog => (
            <Link 
              key={blog.id} 
              to={`/blogs/${blog.id}`} 
              className="flex items-center gap-4 group"
            >
              <div 
                className="w-24 h-24 rounded-lg bg-cover bg-center overflow-hidden flex-shrink-0"
                style={{ backgroundImage: `url(${blog.image})` }}
              ></div>
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-snug line-clamp-3">
                  {blog.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
