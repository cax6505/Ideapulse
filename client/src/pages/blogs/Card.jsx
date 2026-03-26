import React from 'react';
import { Link } from 'react-router-dom';
import { formatRelativeTime } from '../../utils/timeUtils';
import { useBookmarks } from '../../hooks/useBookmarks';
import BookmarkButton from '../../components/common/BookmarkButton';

const Card = ({ blog }) => {
  const { id, title, image, category, author, authorPic, published_date, reading_time, tags, content, createdAt } = blog;
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Strip HTML tags from content for preview
  const plainContent = typeof content === 'string' ? content.replace(/<[^>]*>/g, '') : '';

  // Use createdAt for relative time if available, fallback to published_date
  const timeLabel = formatRelativeTime(createdAt || published_date);

  return (
    <Link
      to={`/blogs/${id}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100/80 shadow-[0_2px_15px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 h-full"
    >
      {/* Image — fixed 16:9 aspect ratio */}
      <div className="relative w-full overflow-hidden bg-gray-100" style={{ paddingBottom: '56.25%' }}>
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #e2e8f0, #cbd5e1)';
          }}
        />
        {/* Category badge */}
        {category && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white/95 backdrop-blur-sm text-[10px] font-bold text-gray-800 rounded-full uppercase tracking-wider shadow-sm ring-1 ring-black/5">
            {category}
          </span>
        )}

        {/* Subtle gradient at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-[15px] font-bold text-gray-900 mb-2 line-clamp-2 font-serif leading-snug group-hover:text-indigo-700 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-400 text-[13px] line-clamp-2 leading-relaxed flex-grow">
          {plainContent}
        </p>

        {/* Author row */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
          {authorPic ? (
            <img
              src={authorPic}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-white shadow-sm flex-shrink-0"
              alt={author}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{author?.[0]?.toUpperCase()}</span>
            </div>
          )}
          <div className="flex items-center justify-between min-w-0 flex-grow">
            <div>
              <p className="font-semibold text-gray-800 text-[12px] capitalize truncate">{author}</p>
              <div className="flex items-center text-[10px] text-gray-400 gap-1.5 font-medium mt-0.5">
                {reading_time && <><span>{reading_time}</span><span className="w-1 h-1 rounded-full bg-gray-300" /></>}
                <span>{timeLabel}</span>
              </div>
            </div>
            <div className="flex-shrink-0 ml-2">
              <BookmarkButton
                isBookmarked={isBookmarked(id)}
                onToggle={() => toggleBookmark(blog)}
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
