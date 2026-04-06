import React from 'react';

const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse h-full flex flex-col">
    <div className="bg-gray-200 w-full" style={{ paddingBottom: '56.25%' }}></div>
    <div className="p-5 space-y-3 flex flex-col flex-grow">
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-1"></div>
      <div className="h-4 bg-gray-100 rounded w-full"></div>
      <div className="h-4 bg-gray-100 rounded w-2/3"></div>
      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0"></div>
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="h-2 bg-gray-100 rounded w-16"></div>
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonCard;
