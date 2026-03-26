import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { searched } from "../../redux/features/filter/filterSlice";

/**
 * Enhanced Search Component with 300ms Debouncing.
 * Automatically filters blogs as the user types without requiring a form submission.
 */
const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.filter);
  const [input, setInput] = useState(search);

  const match = useMatch("/");
  const navigate = useNavigate();

  // Debouncing logic: dispatch the search action after 300ms of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(searched(input));
      
      // If we're not on the home page and the user has typed something, navigate to the home page to show results
      if (input && !match) {
        navigate("/");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input, dispatch, match, navigate]);

  // Handle manual form submission (optional, but good for UX on 'Enter' key)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searched(input));
    if (!match) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center h-11 w-full max-w-sm rounded-xl focus-within:ring-2 focus-within:ring-indigo-100 bg-gray-50 border border-transparent focus-within:border-indigo-200 focus-within:bg-white transition-all overflow-hidden group">
      <div className="grid place-items-center h-full w-12 text-gray-400 group-focus-within:text-indigo-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-4 bg-transparent font-medium placeholder-gray-400"
        type="text"
        id="search"
        placeholder="Search stories, topics, and authors..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default Search;
