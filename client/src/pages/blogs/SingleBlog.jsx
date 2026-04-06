import React, { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchBlog } from "../../redux/features/singleBlog/blogSlice";
import { fetchRelatedBlogs } from "../../redux/features/relatedBlogs/relatedBlogsSlice";
import RelatedBlogCard from "./RelatedBlogCard";
import ReadingProgressBar from "../../components/common/ReadingProgressBar";
import BookmarkButton from "../../components/common/BookmarkButton";
import ShareButtons from "../../components/common/ShareButtons";
import CommentSection from "../../components/write/CommentSection";
import { useBookmarks } from "../../hooks/useBookmarks";
import SkeletonSingleBlog from "../../components/common/SkeletonSingleBlog";
import SkeletonCard from "../../components/common/SkeletonCard";

const SingleBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, isLoading, isError, error } = useSelector((state) => state.blog);
  const { relatedBlogs, isLoading: isRelatedLoading } = useSelector((state) => state.relatedBlogs);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    dispatch(fetchBlog(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (blog?.tags) {
      dispatch(fetchRelatedBlogs({ tags: blog.tags, id }));
    }
  }, [dispatch, blog, id]);

  if (isLoading) {
    return <SkeletonSingleBlog />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-white transition-colors">
        <p className="text-xl font-semibold text-red-500">{error || "Failed to load the article"}</p>
      </div>
    );
  }

  const { title, image, content, category, author, reading_time, published_date, tags } = blog || {};
  const currentUrl = window.location.href;

  return (
    <>
      <ReadingProgressBar />
      <article className="mt-8 max-w-5xl mx-auto px-4 lg:px-0 mb-20 relative">
        <div className="mb-4 md:mb-0 w-full relative">
          <div className="mb-4">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 leading-tight">
              {title}
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-y border-gray-50 py-4">
            <div className="flex items-center gap-4">
              <span className="py-1 px-3 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                {category || "General"}
              </span>
              <span className="text-gray-500 text-sm font-medium">{published_date}</span>
              <span className="text-gray-500 text-sm font-medium">• {reading_time}</span>
            </div>
            
            <div className="flex items-center gap-6">
              <BookmarkButton 
                isBookmarked={isBookmarked(id)} 
                onToggle={() => toggleBookmark(blog)} 
                size="md"
              />
              <div className="w-[1px] h-6 bg-gray-200" />
              <ShareButtons title={title} url={currentUrl} />
            </div>
          </div>

          <img
            src={image}
            className="w-full object-cover lg:rounded-xl shadow-sm mb-12"
            style={{ height: "30em" }}
            alt="Blog Cover"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div 
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed w-full prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full prose-img:object-cover prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-li:marker:text-blue-500 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-xl prose-blockquote:not-italic"
            dangerouslySetInnerHTML={{ __html: content || "" }} 
          />
        </div>

        {/* Comment Section Integration */}
        <div className="my-20 border-y border-gray-100 py-12">
           <CommentSection blogId={id} />
        </div>

        <div className="mt-12 mb-8 pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 items-center flex gap-2">
            <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
            Related Stories
          </h3>
          <div className="flex flex-wrap -m-4">
            {isRelatedLoading ? (
               [...Array(3)].map((_, i) => (
                 <div key={i} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                    <SkeletonCard />
                 </div>
               ))
            ) : relatedBlogs?.length > 0 ? (
              relatedBlogs.map((relatedBlog) => (
                <div className="w-full sm:w-1/2 lg:w-1/3 p-4" key={relatedBlog.id}>
                  <RelatedBlogCard blog={relatedBlog} />
                </div>
              ))
            ) : (
              <p className="px-4 text-gray-500">No related stories found.</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-8 mt-4">
          <Link
            to="/"
            className="text-gray-900 font-bold hover:text-blue-600 inline-flex items-center justify-center transition-colors"
          >
            <AiOutlineArrowRight className="mr-2 rotate-180" />
            Back to Stories
          </Link>
        </div>
      </article>
    </>
  );
};

export default SingleBlog;
