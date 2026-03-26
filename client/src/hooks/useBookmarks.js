import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'blogverse_bookmarks';

/**
 * Custom hook for managing bookmarked articles.
 * Persists bookmarks in localStorage as an array of blog objects.
 */
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = useCallback(
    (blogId) => bookmarks.some((b) => b.id === blogId),
    [bookmarks]
  );

  const toggleBookmark = useCallback((blog) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === blog.id);
      if (exists) {
        return prev.filter((b) => b.id !== blog.id);
      }
      // Store only the essential fields to keep localStorage lean
      const slim = {
        id: blog.id,
        title: blog.title,
        image: blog.image,
        category: blog.category,
        author: blog.author,
        authorPic: blog.authorPic,
        published_date: blog.published_date,
        reading_time: blog.reading_time,
        content: typeof blog.content === 'string' ? blog.content.slice(0, 300) : '',
        createdAt: blog.createdAt,
        tags: blog.tags,
      };
      return [slim, ...prev];
    });
  }, []);

  const removeBookmark = useCallback((blogId) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== blogId));
  }, []);

  const clearAll = useCallback(() => {
    setBookmarks([]);
  }, []);

  return { bookmarks, isBookmarked, toggleBookmark, removeBookmark, clearAll };
}
