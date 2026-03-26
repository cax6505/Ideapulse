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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const emailPrefix = localStorage.getItem("emailPrefix");
    const fullEmail = localStorage.getItem("email");
    const photoURL = localStorage.getItem("photoURL");
    
    if (userName || emailPrefix) {
      setUser({
        name: userName || emailPrefix,
        email: fullEmail || `${emailPrefix}@example.com`,
        photoURL: photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop"
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim() || formData.content === '<p></p>') newErrors.content = "Story content is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    
    if (formData.image.trim()) {
      try {
        new URL(formData.image);
        // Basic check for image extensions or Unsplash
        if (!formData.image.match(/\.(jpeg|jpg|gif|png|webp|avif|svg)(\?.*)?$/i) && !formData.image.includes('unsplash.com') && !formData.image.includes('images.')) {
           newErrors.image = "Invalid image source. Please provide a valid image URL.";
        }
      } catch (e) {
        newErrors.image = "Invalid image source. Must be a valid URL.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsPublishing(true);

    try {
      const authorName = user?.name || "Anonymous";
      const authorEmail = user?.email || "";
      const authorPic = user?.photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop";
      
      const newBlog = {
        title: formData.title,
        content: formData.content,
        image: formData.image || "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1470&auto=format&fit=crop",
        category: formData.category || "General",
        author: authorName,
        authorEmail: authorEmail,
        authorPic: authorPic,
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
          disabled={isPublishing}
          className={`px-6 py-2.5 rounded-full font-bold transition-all text-sm shadow-md ${
            isPublishing 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-900 hover:bg-black text-white'
          }`}
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>

      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className={`w-full text-6xl font-bold font-serif text-gray-900 placeholder-[#cbd5e1] border-none outline-none focus:ring-0 px-0 bg-transparent resize-none leading-tight mb-2 ${errors.title ? 'border-b-2 border-red-500' : ''}`}
            autoFocus
          />
          {errors.title && <p className="text-red-500 text-sm font-medium">{errors.title}</p>}
        </div>

        <div>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Cover Image URL (e.g. from unsplash)"
            className={`w-full text-base font-medium text-gray-600 placeholder-[#94a3b8] border-b outline-none focus:ring-0 px-0 py-4 bg-transparent transition-colors ${errors.image ? 'border-red-500 focus:border-red-500' : 'border-gray-100 focus:border-gray-300'}`}
          />
          {errors.image && <p className="text-red-500 text-sm font-medium mt-1">{errors.image}</p>}
        </div>
        
        <div>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category (e.g. Technology, Design)"
            className={`w-full text-base font-medium text-gray-600 placeholder-[#94a3b8] border-b outline-none focus:ring-0 px-0 py-4 bg-transparent transition-colors ${errors.category ? 'border-red-500 focus:border-red-500' : 'border-gray-100 focus:border-gray-300'}`}
          />
          {errors.category && <p className="text-red-500 text-sm font-medium mt-1">{errors.category}</p>}
        </div>

        {/* Rich Text Editor for Content */}
        <div className="mt-8 mb-4">
           <RichTextEditor 
             content={formData.content} 
             onChange={handleContentChange} 
           />
           {errors.content && <p className="text-red-500 text-sm font-medium mt-2">{errors.content}</p>}
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
