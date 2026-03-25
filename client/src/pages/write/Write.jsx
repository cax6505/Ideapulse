import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from '../../api/firebase';
import RichTextEditor from '../../components/write/RichTextEditor';

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("emailPrefix");
    if (email) {
      setUser({
        name: email.split('@')[0],
        email: email
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
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
    if (e) e.preventDefault();
    if (!formData.title || !formData.content) return;
    
    setIsPublishing(true);

    try {
      const authorName = user?.name || "Anonymous";
      
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
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "blogs"), newBlog);
      navigate('/');
    } catch (error) {
      console.error('Failed to publish blog:', error);
      alert('Failed to publish. ' + error.message);
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold font-serif text-gray-900 tracking-tight">Draft a new story</h1>
        <button 
          onClick={handleSubmit} 
          disabled={!formData.title || !formData.content || isPublishing}
          className={`px-5 py-2 rounded-full font-medium transition-colors text-sm ${
            !formData.title || !formData.content || isPublishing 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-[#98a2b3] hover:bg-[#475467] text-white shadow-sm'
          }`}
        >
          {isPublishing ? 'Publishing' : 'Publish'}
        </button>
      </div>

      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full text-6xl font-bold font-serif text-gray-900 placeholder-[#cbd5e1] border-none outline-none focus:ring-0 px-0 bg-transparent resize-none leading-tight mb-2"
          autoFocus
        />

        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Cover Image URL (e.g. from unsplash)"
          className="w-full text-base font-medium text-gray-600 placeholder-[#94a3b8] border-b border-gray-100 outline-none focus:ring-0 px-0 py-4 bg-transparent transition-colors focus:border-gray-200"
        />
        
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category (e.g. Technology, Design)"
          className="w-full text-base font-medium text-gray-600 placeholder-[#94a3b8] border-b border-gray-100 outline-none focus:ring-0 px-0 py-4 bg-transparent transition-colors focus:border-gray-200"
        />

        {/* Rich Text Editor for Content */}
        <div className="mt-8 mb-12">
           <RichTextEditor 
             content={formData.content} 
             onChange={handleContentChange} 
           />
        </div>

        <div className="border-t border-gray-100 pt-10 mt-6">
          <label className="block text-sm font-semibold text-[#1d2939] mb-4">Add or change tags (up to 5) so readers know what your story is about</label>
          <div className="flex flex-wrap gap-2 mb-4">
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
            className="w-full sm:w-96 text-sm text-[#475467] placeholder-[#98a2b3] border border-[#d0d5dd] rounded-lg outline-none focus:ring-2 focus:ring-[#f2f4f7] focus:border-[#98a2b3] px-4 py-3 bg-white disabled:bg-gray-50 transition-all shadow-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default Write;
