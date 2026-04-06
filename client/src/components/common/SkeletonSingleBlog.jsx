import React from "react";

const SkeletonSingleBlog = () => {
  return (
    <div className="mt-8 max-w-5xl mx-auto px-4 lg:px-0 mb-20 w-full animate-pulse">
      {/* Title */}
      <div className="h-10 md:h-14 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
      <div className="h-10 md:h-14 bg-gray-200 rounded-lg w-1/2 mb-8"></div>
      
      {/* Meta info & Action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-y border-gray-50 py-4">
        <div className="flex items-center gap-4 w-full">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="w-full h-[20em] md:h-[30em] bg-gray-200 lg:rounded-xl shadow-sm mb-12"></div>
      
      {/* Content */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default SkeletonSingleBlog;
