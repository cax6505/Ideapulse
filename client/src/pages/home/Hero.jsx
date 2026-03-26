import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ blogs }) => {
  if (!blogs || blogs.length === 0) return null;
  
  const featuredBlog = blogs[0];
  const otherFeatured = blogs.slice(1, 5);

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Main Featured Post */}
      <Link 
        to={`/blogs/${featuredBlog.id}`} 
        className="block flex-1 group overflow-hidden rounded-3xl relative shadow-2xl h-[400px] md:h-[550px]"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${featuredBlog.image})` }}
        ></div>
        {/* Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-10 w-full">
          <span className="inline-block px-4 py-1.5 mb-5 text-[10px] font-bold tracking-[0.2em] text-white uppercase border border-white/30 rounded-full bg-white/10 backdrop-blur-md">
            {featuredBlog.category || 'Featured Story'}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight font-serif group-hover:underline underline-offset-8 decoration-white/30">
            {featuredBlog.title}
          </h1>
          <div className="flex items-center gap-3 mt-6 text-white/70 text-sm font-medium">
             <span>{featuredBlog.author}</span>
             <span className="w-1 h-1 rounded-full bg-white/40"></span>
             <span>{featuredBlog.reading_time}</span>
          </div>
        </div>
      </Link>

      {/* Other Featured Posts */}
      <div className="w-full lg:w-[380px] flex flex-col gap-8">
        <div className="flex items-center justify-between border-b pb-4">
           <h3 className="text-xl font-bold text-gray-900 font-serif uppercase tracking-wider">Top Stories</h3>
        </div>
        <div className="flex flex-col gap-8">
          {otherFeatured.map(blog => (
            <Link 
              key={blog.id} 
              to={`/blogs/${blog.id}`} 
              className="flex items-center gap-5 group"
            >
              <div 
                className="w-24 h-24 rounded-2xl bg-cover bg-center overflow-hidden flex-shrink-0 shadow-lg ring-1 ring-gray-200 transition-all group-hover:ring-blue-500/50 group-hover:shadow-xl"
                style={{ backgroundImage: `url(${blog.image})` }}
              ></div>
              <div className="flex flex-col justify-center flex-1">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest mb-1">{blog.category}</span>
                <h4 className="text-base font-bold text-gray-800 transition-colors leading-tight line-clamp-2 font-serif">
                  {blog.title}
                </h4>
                <div className="flex items-center text-[10px] text-gray-500 mt-2 font-medium">
                   <span>{blog.author}</span>
                   <span className="mx-2">•</span>
                   <span>{blog.published_date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
