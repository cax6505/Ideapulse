import React from 'react';
import { Link } from 'react-router-dom';

const RecentPosts = ({ blogs }) => {
  return (
    <div className="mt-16">
      <div className="flex justify-between items-end mb-10 border-b pb-5">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 font-serif">Latest Stories</h2>
          <p className="text-sm text-gray-500 mt-1">Discover the most recent insights from our community</p>
        </div>
        <Link to="/blogs" className="px-6 py-2.5 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
          Explore All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map(blog => (
          <Link key={blog.id} to={`/blogs/${blog.id}`} className="group flex flex-col h-full rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100">
            {/* Image */}
            <div className="h-64 w-full overflow-hidden relative">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${blog.image})` }}
              ></div>
              <div className="absolute top-4 left-4">
                 <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-gray-900 rounded-full shadow-sm uppercase tracking-wider ring-1 ring-black/5">
                    {blog.category}
                 </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-4 transition-colors line-clamp-2 font-serif leading-tight">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm mb-8 line-clamp-3 flex-grow leading-relaxed">
                {blog.content}
              </p>
              
              {/* Meta / Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-50 mt-auto">
                <img 
                  src={blog.authorPic} 
                  alt={blog.author} 
                  className="w-11 h-11 rounded-full object-cover shadow-md ring-2 ring-white" 
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900">{blog.author}</span>
                  <div className="flex items-center text-[10px] text-gray-500 gap-2 mt-0.5 font-medium">
                    <span>{blog.reading_time}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{blog.published_date}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
