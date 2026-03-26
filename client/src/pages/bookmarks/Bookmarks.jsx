import React from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../../hooks/useBookmarks';
import { formatRelativeTime } from '../../utils/timeUtils';
import { FiBookmark, FiTrash2 } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';

const Bookmarks = () => {
  const { bookmarks, removeBookmark, clearAll } = useBookmarks();

  return (
    <div className="max-w-4xl mx-auto px-4 mt-12 mb-20">
      {/* Header */}
      <div className="flex items-end justify-between mb-10 border-b pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <FaBookmark className="text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 font-serif">Reading List</h1>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            {bookmarks.length === 0
              ? 'Your reading list is empty. Bookmark stories to save them here.'
              : `${bookmarks.length} saved ${bookmarks.length === 1 ? 'story' : 'stories'}`}
          </p>
        </div>
        {bookmarks.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 hover:text-red-700
                       hover:bg-red-50 rounded-full transition-all duration-200"
          >
            <FiTrash2 />
            Clear all
          </button>
        )}
      </div>

      {/* Empty state */}
      {bookmarks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
            <FiBookmark className="text-3xl text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No saved stories yet</h3>
          <p className="text-gray-400 max-w-sm mb-8">
            Tap the bookmark icon on any story to save it to your reading list for later.
          </p>
          <Link
            to="/blogs"
            className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-black transition-colors shadow-sm"
          >
            Explore Stories
          </Link>
        </div>
      )}

      {/* Bookmark list */}
      <div className="flex flex-col gap-1">
        {bookmarks.map((blog) => {
          const plainContent = typeof blog.content === 'string'
            ? blog.content.replace(/<[^>]*>/g, '')
            : '';
          const timeLabel = formatRelativeTime(blog.createdAt || blog.published_date);

          return (
            <div
              key={blog.id}
              className="group flex gap-5 py-6 border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/50 -mx-4 px-4 rounded-xl"
            >
              {/* Text content */}
              <div className="flex-1 min-w-0">
                <Link to={`/blogs/${blog.id}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {blog.authorPic ? (
                      <img
                        src={blog.authorPic}
                        alt={blog.author}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-[8px] font-bold">{blog.author?.[0]?.toUpperCase()}</span>
                      </div>
                    )}
                    <span className="text-[12px] font-semibold text-gray-700">{blog.author}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 font-serif leading-snug mb-1 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-3">
                    {plainContent}
                  </p>
                </Link>

                <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                  {blog.category && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {blog.category}
                    </span>
                  )}
                  {blog.reading_time && <span>{blog.reading_time}</span>}
                  <span>{timeLabel}</span>
                  <button
                    onClick={() => removeBookmark(blog.id)}
                    className="ml-auto flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove from reading list"
                  >
                    <FiTrash2 className="text-[13px]" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

              {/* Thumbnail */}
              <Link to={`/blogs/${blog.id}`} className="flex-shrink-0">
                <div className="w-28 h-28 md:w-36 md:h-24 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.style.background = 'linear-gradient(135deg, #e2e8f0, #cbd5e1)';
                    }}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmarks;
