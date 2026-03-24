import React from 'react';
import { Link } from 'react-router-dom';

const RecentPosts = ({ blogs }) => {
  return (
    <div className="mt-16">
      <div className="flex justify-between items-end mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
        <Link to="/blogs" className="px-5 py-2 border rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors">
          All Posts
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(blog => (
          <Link key={blog.id} to={`/blogs/${blog.id}`} className="group flex flex-col h-full rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 bg-white shadow-sm border border-gray-100">
            {/* Image */}
            <div className="h-56 w-full overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${blog.image})` }}
              ></div>
            </div>
            
            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                {blog.content}
              </p>
              
              {/* Meta / Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                <img 
                  src={blog.authorPic} 
                  alt={blog.author} 
                  className="w-10 h-10 rounded-full object-cover shadow-sm bg-gray-100" 
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">{blog.author}</span>
                  <div className="flex items-center text-xs text-gray-500 gap-1.5 mt-0.5">
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
