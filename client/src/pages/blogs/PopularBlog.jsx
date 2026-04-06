 
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRelatedBlogs } from "../../redux/features/relatedBlogs/relatedBlogsSlice";
import RelatedBlogCard from "./RelatedBlogCard";
import SkeletonCard from "../../components/common/SkeletonCard";

const PopularBlog = ({currentVideoId, tags}) => {
  const dispatch = useDispatch();
  const { relatedBlogs, isLoading, isError, error } = useSelector(
    (state) => state.relatedBlogs
  );

  useEffect(() => {
    dispatch(fetchRelatedBlogs({ tags, id: currentVideoId }));
  }, [dispatch, tags, currentVideoId]);

  console.log(relatedBlogs);

  return (
    <section className="text-gray-600 mt-12">
      <h2 className="text-3xl font-bold">Popular Blogs</h2>
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-wrap -m-4">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="w-full md:w-1/2 lg:w-1/3 p-4">
                 <SkeletonCard />
              </div>
            ))
          ) : relatedBlogs.length > 0 ? (
            relatedBlogs.slice(0, 3).map((blog, index) => (
              <div className="w-full md:w-1/2 lg:w-1/3 p-4" key={index}>
                <RelatedBlogCard blog={blog} />
              </div>
            ))
          ) : (
            <div className="p-4 w-full text-center text-gray-500">No popular blogs found</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularBlog;
