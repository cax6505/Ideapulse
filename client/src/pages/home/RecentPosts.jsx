import React from 'react';
import { Link } from 'react-router-dom';
import { formatRelativeTime } from '../../utils/timeUtils';
import { useBookmarks } from '../../hooks/useBookmarks';
import BookmarkButton from '../../components/common/BookmarkButton';

const RecentPosts = ({ blogs }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();

  return (
    <div className="mt-16">
      <div className="flex justify-between items-end mb-10 border-b pb-5">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 font-serif">Latest Stories</h2>
          <p className="text-sm text-gray-500 mt-1">Discover the most recent insights from our community</p>
        </div>
        <Link
          to="/blogs"
          className="px-6 py-2.5 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
        >
          Explore All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(blog => {
          const timeLabel = formatRelativeTime(blog.createdAt || blog.published_date);
          const plainContent = typeof blog.content === 'string'
            ? blog.content.replace(/<[^>]*>/g, '')
            : '';

          return (
            <div key={blog.id} className="relative group">
              <Link
                to={`/blogs/${blog.id}`}
                className="flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100/80
                           shadow-[0_2px_15px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)]
                           hover:-translate-y-1.5 transition-all duration-400 h-full"
              >
                {/* Image — fixed 16:9 aspect ratio */}
                <div className="relative w-full overflow-hidden bg-gray-100" style={{ paddingBottom: '56.25%' }}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.style.background = 'linear-gradient(135deg, #e2e8f0, #cbd5e1)';
                    }}
                  />
                  {/* Category badge */}
                  <span className="absolute top-3 left-4 px-2.5 py-0.5 bg-white/95 backdrop-blur-sm text-[10px] font-bold text-gray-800 rounded-full shadow-sm uppercase tracking-wider ring-1 ring-black/5">
                    {blog.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-[17px] font-bold text-gray-900 mb-2.5 line-clamp-2 font-serif leading-snug group-hover:text-indigo-700 transition-colors duration-200">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-[13px] line-clamp-2 leading-relaxed flex-grow">
                    {plainContent}
                  </p>

                  {/* Author meta */}
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                    {blog.authorPic ? (
                      <img
                        src={blog.authorPic}
                        alt={blog.author}
                        className="w-9 h-9 rounded-full object-cover shadow-sm ring-2 ring-white flex-shrink-0"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{blog.author?.[0]?.toUpperCase()}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between min-w-0 flex-grow">
                      <div>
                        <span className="text-[13px] font-bold text-gray-900 truncate">{blog.author}</span>
                        <div className="flex items-center text-[11px] text-gray-400 gap-1.5 mt-0.5 font-medium">
                          {blog.reading_time && (
                            <><span>{blog.reading_time}</span><span className="w-1 h-1 rounded-full bg-gray-300" /></>
                          )}
                          <span>{timeLabel}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        <BookmarkButton 
                          isBookmarked={isBookmarked(blog.id)} 
                          onToggle={() => toggleBookmark(blog)} 
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentPosts;
