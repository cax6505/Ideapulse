import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ blog }) => {
  const { id, title, image, category, author, authorPic, published_date, reading_time, tags, content } = blog;

  // Strip HTML tags from content for preview
  const plainContent = typeof content === 'string' ? content.replace(/<[^>]*>/g, '') : '';

  return (
    <Link
      className="flex flex-col rounded-2xl w-full overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group h-full"
      to={`/blogs/${blog.id}`}
    >
        {/* Image */}
        <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add('bg-gradient-to-br', 'from-gray-200', 'to-gray-300');
            }}
          />
          {category && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-gray-900 rounded-full uppercase tracking-wider ring-1 ring-black/5">
              {category}
            </span>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5 flex flex-col justify-between leading-normal">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 font-serif leading-snug">
              {title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{plainContent}</p>
          </div>
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50">
            <img
              src={authorPic} 
              className="h-9 w-9 rounded-full object-cover ring-2 ring-white shadow-sm"
              alt={`Author ${author}`}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <p className="font-semibold text-gray-800 text-sm capitalize">{author}</p>
              <div className="flex items-center text-[10px] text-gray-400 gap-1.5 font-medium">
                <span>{reading_time}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>{published_date}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
  );
};

export default Card;
