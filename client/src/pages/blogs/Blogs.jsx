import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/features/blogs/blogsSlice';
import Card from './Card';
import SkeletonCard from '../../components/common/SkeletonCard';

const ITEMS_PER_PAGE = 9;

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, error } = useSelector((state) => state.blogs);
  const { tags, search } = useSelector((state) => state.filter);

  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBlogs({ tags, search }));

    // Auto-refresh every 30 minutes
    const interval = setInterval(() => {
      dispatch(fetchBlogs({ tags, search }));
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, tags, search]);

  // Extract unique categories from all blogs
  const categories = useMemo(() => {
    if (!blogs || blogs.length === 0) return ['All'];
    const cats = [...new Set(blogs.map(b => b.category).filter(Boolean))];
    return ['All', ...cats.sort()];
  }, [blogs]);

  // Filter blogs by active category
  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    if (activeCategory === 'All') return blogs;
    return blogs.filter(b => b.category === activeCategory);
  }, [blogs, activeCategory]);

  // Paginate
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when category changes
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 mt-12 mb-20">
      {/* Page Header */}
      <div className="mb-6 border-b pb-5">
        <h1 className="text-4xl font-bold text-gray-900 font-serif">All Stories</h1>
        <p className="text-gray-500 mt-2">Explore the full collection of stories from our community.</p>
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-10 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 pb-2 min-w-max">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isLoading && blogs.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : isError && blogs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl font-bold text-red-500 mb-2">Oops!</p>
          <p className="text-gray-500">{error || 'Something went wrong.'}</p>
        </div>
      ) : paginatedBlogs.length > 0 ? (
        <>
          {/* Results count */}
          <p className="text-sm text-gray-400 mb-6 font-medium">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredBlogs.length)} of {filteredBlogs.length} stories
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBlogs.map((blog) => (
              <Card key={blog.id} blog={blog} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                ← Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                    currentPage === i + 1
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">No stories found</h3>
          <p className="text-gray-500 mb-4">No stories match the "{activeCategory}" category.</p>
          <button 
            onClick={() => handleCategoryChange('All')}
            className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-black transition-colors"
          >
            View all stories
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
