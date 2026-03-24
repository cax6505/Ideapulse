import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/features/blogs/blogsSlice';
import Hero from './Hero';
import RecentPosts from './RecentPosts';
import LandingBanner from './LandingBanner';

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, error } = useSelector(
    (state) => state.blogs
  );
  const { tags, search } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchBlogs({ tags, search }));
  }, [dispatch, tags, search]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
         <p className="text-xl font-semibold text-red-500">{error || 'Something went wrong'}</p>
      </div>
    );
  }

  return (
    <div className="font-primary mt-12 mb-20 space-y-20">
      {/* Conditionally render Hero vs LandingBanner */}
      {!isLoggedIn && <LandingBanner />}
      {isLoggedIn && blogs?.length > 0 && <Hero blogs={blogs} />}

      {/* Recent Posts Grid */}
      {isLoggedIn && blogs?.length > 5 && (
        <RecentPosts blogs={blogs.slice(5)} />
      )}
    </div>
  );
};

export default Home;
