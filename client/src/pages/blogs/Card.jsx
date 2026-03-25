import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ blog }) => {
  const { id, title, image, category, author, authorPic, published_date, reading_time, tags, content } = blog;

  return (
    <div className="mb-10">
      <Link
        className="block rounded-3xl w-full lg:flex overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
        to={`/blogs/${blog.id}`}
      >
        <div
          className="h-48 lg:h-auto lg:w-64 flex-none bg-cover bg-center text-center overflow-hidden"
          style={{ backgroundImage: `url(${image})` }}
          title={title}
        ></div>
        <div className="p-6 flex flex-col justify-between leading-normal flex-1">
          <div>
            <div className="mt-3 md:mt-0 text-gray-700 font-bold text-2xl mb-2">
              {title}
            </div>
            <p className="text-gray-700 text-base">{content}</p>
            <p className='text-sm italic py-1 text-gray-700'>
              Tags: {tags.map((tag, ind) => <span key={ind} className='mx-1 underline'>{tag}</span>)}
            </p>
          </div>
          <div className="flex mt-3">
            <img
              src={authorPic} 
              className="h-10 w-10 rounded-full mr-2 object-cover"
              alt={`Author ${author}`}
            />
            <div className='space-x-1.5'>
              <p className="font-semibold text-gray-700 text-sm capitalize">{author}</p>
              <p className="text-gray-600 text-xs">{published_date} </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
