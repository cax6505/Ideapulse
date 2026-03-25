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
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-medium text-gray-600">Curating your feed</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
         <div className="text-center">
            <p className="text-2xl font-bold text-red-500 mb-2">Oops!</p>
            <p className="text-gray-600">{error || 'Something went wrong while fetching stories.'}</p>
         </div>
      </div>
    );
  }

  if (!isLoggedIn) {
     return <LandingBanner />;
  }

  return (
    <div className="font-primary mt-12 mb-20 space-y-20 px-4 md:px-0">
      {/* Hero section */}
      {blogs?.length > 0 && <Hero blogs={blogs} />}

      {/* Recent Posts Grid */}
      {blogs?.length > 5 && (
        <RecentPosts blogs={blogs.slice(5)} />
      )}
    </div>
  );
};

export default Home;
