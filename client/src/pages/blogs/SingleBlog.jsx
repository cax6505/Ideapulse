import React, { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchBlog } from "../../redux/features/singleBlog/blogSlice";

const SingleBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, isLoading, isError, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlog(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading article...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">{error || "Failed to load the article"}</p>
      </div>
    );
  }

  const { title, image, content, category, author, reading_time, published_date } = blog || {};

  return (
    <article className="mt-8 max-w-5xl mx-auto">
      <div className="mb-4 md:mb-0 w-full mx-auto relative px-4 lg:px-0">
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 leading-tight mb-4">
          {title}
        </h2>
        
        <div className="flex items-center gap-4 mb-6">
          <span className="py-1 px-3 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
            {category || "General"}
          </span>
          <span className="text-gray-500 text-sm font-medium">{published_date}</span>
          <span className="text-gray-500 text-sm font-medium">• {reading_time}</span>
        </div>

        <img
          src={image}
          className="w-full object-cover lg:rounded-xl shadow-sm mb-12"
          style={{ height: "30em" }}
          alt="Blog Cover"
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-12 px-4 lg:px-0">
        <div 
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed w-full"
          dangerouslySetInnerHTML={{ __html: content || "" }} 
        />
      </div>

      <div className="flex items-center justify-between mt-12 mb-20 px-4 lg:px-0 border-t pt-8">
        <Link
          to="/"
          className="text-gray-900 font-bold hover:text-blue-600 inline-flex items-center justify-center transition-colors"
        >
          <AiOutlineArrowRight className="mr-2 rotate-180" />
          Back to Stories
        </Link>
      </div>
    </article>
  );
};

export default SingleBlog;
