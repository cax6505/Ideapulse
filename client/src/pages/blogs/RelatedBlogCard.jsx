import React from 'react';
import { Link } from 'react-router-dom';
import { formatRelativeTime } from '../../utils/timeUtils';

const RelatedBlogCard = ({ blog }) => {
  if (!blog) return null;

  const timeLabel = formatRelativeTime(blog.createdAt || blog.published_date);

  return (
    <Link to={`/blogs/${blog.id}`} className="group block h-full">
      <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100/80 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.11)] transition-all duration-300 group-hover:-translate-y-1">
        
        {/* Image — fixed 16:9 */}
        <div className="relative w-full overflow-hidden bg-gray-100" style={{ paddingBottom: '56.25%' }}>
          <img
            src={blog.image}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = 'linear-gradient(135deg, #e2e8f0, #cbd5e1)';
            }}
          />
          {blog.category && (
            <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white/95 backdrop-blur-sm text-[9px] font-bold text-gray-800 rounded-full uppercase tracking-wider shadow-sm ring-1 ring-black/5">
              {blog.category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h4 className="text-[14px] font-bold text-gray-900 mb-3 line-clamp-2 leading-tight font-serif group-hover:text-indigo-700 transition-colors duration-200">
            {blog.title}
          </h4>

          <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
            {blog.authorPic ? (
              <img
                src={blog.authorPic}
                alt={blog.author}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-gray-100 flex-shrink-0"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[9px] font-bold">{blog.author?.[0]?.toUpperCase()}</span>
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-gray-800 leading-none truncate">{blog.author}</span>
              <span className="text-[9px] text-gray-400 mt-0.5 font-medium">{timeLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedBlogCard;