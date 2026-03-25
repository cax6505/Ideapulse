import React from 'react'
import { Link } from 'react-router-dom'

const RelatedBlogCard = ({ blog }) => {
  if (!blog) return null;

  return (
    <Link to={`/blogs/${blog.id}`} className="group block h-full p-4 md:w-1/3">
      <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="h-40 overflow-hidden relative">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute top-3 left-3">
             <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-[9px] font-bold text-gray-900 rounded-lg shadow-sm uppercase tracking-wider">
                {blog.category}
             </span>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h4 className="text-base font-bold text-gray-900 mb-3 transition-colors line-clamp-2 leading-tight font-serif">
            {blog.title}
          </h4>
          
          <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50">
            <img 
              src={blog.authorPic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
              alt={blog.author} 
              className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-100" 
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-900 leading-none">{blog.author}</span>
              <span className="text-[9px] text-gray-500 mt-0.5">{blog.published_date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RelatedBlogCard