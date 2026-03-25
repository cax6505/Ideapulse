import React from 'react';
import PostCards from './PostCards';
import PopularBlog from './PopularBlog';

const Blogs = () => {
  return (
    <div className="container mx-auto px-4 mt-12 mb-20">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content: Blog Listing */}
        <div className="flex-1">
          <div className="mb-10 border-b pb-5">
            <h1 className="text-4xl font-bold text-gray-900 font-serif">All Stories</h1>
            <p className="text-gray-500 mt-2">Explore the full collection of stories from our community.</p>
          </div>
          <PostCards />
        </div>

        {/* Sidebar: Popular Blogs */}
        <aside className="lg:w-1/3">
          <div className="sticky top-24">
            <PopularBlog />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blogs;
