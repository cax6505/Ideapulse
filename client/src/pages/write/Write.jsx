import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import publicAxios from '../../api/axios';

const Write = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPublishing(true);

    try {
      // Mock author properties since auth isn't fully robust with profiles on the backend
      const email = localStorage.getItem("emailPrefix") || "Anonymous";
      const authorName = email.split('@')[0];

      const newBlog = {
        title: formData.title,
        content: formData.content,
        image: formData.image || "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1470&auto=format&fit=crop",
        category: formData.category || "General",
        author: authorName,
        authorPic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop",
        published_date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        reading_time: "5 min read",
        tags: formData.tags,
        likes: 0,
        createdAt: new Date().toISOString()
      };

      await publicAxios.post('/blogs', newBlog);
      navigate('/');
    } catch (error) {
      console.error('Failed to publish blog:', error);
      alert('Failed to publish. Please try again.');
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-serif">Draft a new story</h1>
        <button 
          onClick={handleSubmit} 
          disabled={!formData.title || !formData.content || isPublishing}
          className={`px-6 py-2 rounded-full text-white font-medium transition-colors shadow-sm ${
            !formData.title || !formData.content || isPublishing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>

      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full text-5xl font-bold font-serif text-gray-900 placeholder-gray-300 border-none outline-none focus:ring-0 px-0 bg-transparent resize-none"
          autoFocus
        />

        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Cover Image URL (e.g. from unsplash)"
          className="w-full text-lg text-gray-600 placeholder-gray-400 border-b border-gray-100 outline-none focus:ring-0 px-0 py-3 bg-transparent transition-colors focus:border-gray-300"
        />
        
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category (e.g. Technology, Design)"
          className="w-full text-lg text-gray-600 placeholder-gray-400 border-b border-gray-100 outline-none focus:ring-0 px-0 py-3 bg-transparent transition-colors focus:border-gray-300"
        />

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Tell your story..."
          className="w-full min-h-[400px] text-xl text-gray-800 placeholder-gray-300 border-none outline-none focus:ring-0 px-0 bg-transparent resize-y leading-relaxed"
        />

        <div className="border-t pt-6 mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Add or change tags (up to 5) so readers know what your story is about</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="text-gray-400 hover:text-gray-600">&times;</button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            disabled={formData.tags.length >= 5}
            placeholder={formData.tags.length >= 5 ? "Maximum 5 tags reached" : "Add a tag and press Enter"}
            className="w-full sm:w-80 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 bg-transparent disabled:bg-gray-50"
          />
        </div>
      </form>
    </div>
  );
};

export default Write;
