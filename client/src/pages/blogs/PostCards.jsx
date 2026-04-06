import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/features/blogs/blogsSlice";
import Card from "./Card";
import SkeletonCard from "../../components/common/SkeletonCard";

const PostCards = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, error } = useSelector(
    (state) => state.blogs
  );

  const { tags, search } = useSelector((state) => state.filter);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    dispatch(fetchBlogs({ tags, search }));
  }, [dispatch, tags, search]);

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full lg:w-2/3">
      {/* single cards */}
      {isLoading ? (
        <div className="flex flex-col gap-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-full">
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : !isError && paginatedBlogs?.length > 0 ? (
        <div className="space-y-6">
          {paginatedBlogs.map((blog, index) => (
            <Card key={index} blog={blog} />
          ))}
          <div className="pagination space-x-2 flex justify-end items-center gap-3">
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-200"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-2 text-lg font-semibold">{currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="col-span-12">No blogs found!</div>
      )}
    </div>
  );
};

export default PostCards;
