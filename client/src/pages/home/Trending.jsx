import React from 'react';
import { Link } from 'react-router-dom';
import { formatRelativeTime } from '../../utils/timeUtils';
import { FiTrendingUp } from 'react-icons/fi';

/**
 * Trending Component featuring a numbered grid layout.
 * Displays the top 6 stories in a 3-column grid (desktop).
 * @param {Array} blogs - The list of blogs to display.
 */
const Trending = ({ blogs }) => {
  if (!blogs || blogs.length === 0) return null;

  // Use the first 6 blogs as trending stories
  const trendingStories = blogs.slice(0, 6);

  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-12 border-b border-gray-100 pb-6">
        <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white shadow-sm flex-shrink-0">
          <FiTrendingUp className="text-sm" />
        </div>
        <h2 className="text-[13px] font-black text-gray-900 uppercase tracking-[0.25em] font-sans">
          Trending on BlogVerse
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
        {trendingStories.map((blog, index) => {
          const timeLabel = formatRelativeTime(blog.createdAt || blog.published_date);
          
          return (
            <Link 
              key={blog.id} 
              to={`/blogs/${blog.id}`}
              className="flex gap-6 group items-start"
            >
              {/* Numbering */}
              <div className="flex-shrink-0 pt-1">
                <span className="text-3xl font-black text-black/10 group-hover:text-black transition-colors duration-300 font-serif leading-none">
                  0{index + 1}
                </span>
              </div>

              {/* Story Details */}
              <div className="flex flex-col min-w-0">
                {/* Author Info */}
                <div className="flex items-center gap-2 mb-2">
                  {blog.authorPic ? (
                    <img 
                      src={blog.authorPic} 
                      alt={blog.author} 
                      className="w-5 h-5 rounded-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-white">
                      <span className="text-[8px] font-bold">{blog.author?.[0]?.toUpperCase()}</span>
                    </div>
                  )}
                  <span className="text-xs font-bold text-gray-800 truncate">{blog.author}</span>
                </div>

                {/* Title */}
                <h3 className="text-[17px] font-bold text-gray-900 font-serif leading-tight mb-2 transition-colors duration-200 line-clamp-2">
                  {blog.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center text-[11px] text-gray-500 font-medium gap-2">
                   <span>{timeLabel}</span>
                   <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                   <span>{blog.reading_time || "5 min read"}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
