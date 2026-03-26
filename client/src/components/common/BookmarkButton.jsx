import React, { useState } from 'react';
import { FiBookmark } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';

/**
 * Animated bookmark toggle button.
 * @param {boolean} isBookmarked - whether the item is currently bookmarked
 * @param {function} onToggle - callback when clicked
 * @param {string} size - 'sm' | 'md' | 'lg'
 */
const BookmarkButton = ({ isBookmarked, onToggle, size = 'md' }) => {
  const [animating, setAnimating] = useState(false);

  const handleClick = (e) => {
    e.preventDefault(); // Prevent Link navigation when inside a card
    e.stopPropagation();
    setAnimating(true);
    onToggle();
    setTimeout(() => setAnimating(false), 400);
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-[13px]',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-xl',
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200
        ${isBookmarked
          ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
          : 'bg-white/90 backdrop-blur-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 ring-1 ring-black/5'
        }
        ${animating ? 'scale-125' : 'scale-100'}
        shadow-sm hover:shadow-md active:scale-95`}
      title={isBookmarked ? 'Remove from reading list' : 'Save to reading list'}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? (
        <FaBookmark className={`transition-transform duration-300 ${animating ? 'animate-pulse' : ''}`} />
      ) : (
        <FiBookmark />
      )}
    </button>
  );
};

export default BookmarkButton;
