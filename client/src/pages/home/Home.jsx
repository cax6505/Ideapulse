import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/features/blogs/blogsSlice';
import Trending from './Trending';
import RecentPosts from './RecentPosts';
import LandingBanner from './LandingBanner';
import SkeletonCard from '../../components/common/SkeletonCard';

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, error } = useSelector(
    (state) => state.blogs
  );
  const { tags, search } = useSelector((state) => state.filter);

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return; // Don't fetch if not logged in
    dispatch(fetchBlogs({ tags, search }));

    // Auto-refresh every 30 minutes
    const interval = setInterval(() => {
      dispatch(fetchBlogs({ tags, search }));
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, tags, search, isLoggedIn]);

  // Show landing banner for logged-out users FIRST — before any loading check
  if (!isLoggedIn) {
    return <LandingBanner />;
  }

  // Show skeleton loader on first load (no cached blogs)
  if (isLoading && blogs.length === 0) {
    return (
      <div className="font-primary mt-12 mb-20 space-y-20 px-4 md:px-0 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (isError && blogs.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
         <div className="text-center">
            <p className="text-2xl font-bold text-red-500 mb-2">Oops!</p>
            <p className="text-gray-600">{error || 'Something went wrong while fetching stories.'}</p>
         </div>
      </div>
    );
  }

  return (
    <div className="font-primary mt-12 mb-20 space-y-20 px-4 md:px-0">
      {/* Trending Stories section (replaced old Hero) */}
      {blogs?.length > 0 && <Trending blogs={blogs} />}

      {/* Grid showing all stories */}
      {blogs?.length > 0 && (
        <RecentPosts blogs={blogs} />
      )}
    </div>
  );
};

export default Home;
