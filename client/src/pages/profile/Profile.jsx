import React, { useState, useEffect } from 'react';
import { FiEdit2, FiCamera, FiUser } from 'react-icons/fi';
import { updateUserMetadata } from '../../api/auth';
import { getBlogs } from '../../redux/features/blogs/blogsAPI';
import Card from '../blogs/Card';
import SkeletonCard from '../../components/common/SkeletonCard';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    photoURL: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [myBlogs, setMyBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    // Load user data from localStorage since Navbar keeps it synced
    const userName = localStorage.getItem("userName");
    const emailPrefix = localStorage.getItem("emailPrefix");
    const fullEmail = localStorage.getItem("email");
    const photoURL = localStorage.getItem("photoURL");

    const currentUser = {
      name: userName || emailPrefix || 'Anonymous',
      email: fullEmail || `${emailPrefix}@example.com`,
      photoURL: photoURL || null
    };

    setUser(currentUser);
    setEditFormData({ name: currentUser.name });
    
    // Fetch blogs authored by the user
    const fetchUserBlogs = async () => {
      setLoadingBlogs(true);
      try {
        const allBlogs = await getBlogs();
        // Filter by either matching email or matching exact name (for legacy blogs)
        const userSpecificBlogs = allBlogs.filter((blog) => {
           return blog.authorEmail === currentUser.email || blog.author === currentUser.name;
        });
        setMyBlogs(userSpecificBlogs);
      } catch (error) {
        console.error("Failed to load user blogs:", error);
      } finally {
        setLoadingBlogs(false);
      }
    };
    
    fetchUserBlogs();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const result = await updateUserMetadata({ 
        displayName: editFormData.name, 
        photoFile: selectedFile 
      });

      // Update local state
      setUser(prev => ({
        ...prev,
        name: result.displayName || prev.name,
        photoURL: result.photoURL || prev.photoURL
      }));
      
      setIsEditing(false);
      window.location.reload(); // Reload to sync Navbar and other components easily
    } catch (error) {
      alert("Error updating profile. " + (error.message || 'Please try again.'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-12">
      
      {/* Left Sidebar: Profile Details */}
      <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col items-center md:items-start space-y-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Profile</h1>
        
        <div className="w-40 h-40 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden relative group">
          {previewURL || user.photoURL ? (
            <img src={previewURL || user.photoURL} alt="Profile" className="w-full h-full object-cover" />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
               <FiUser size={64} />
             </div>
          )}
          
          {isEditing && (
            <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
              <FiCamera size={24} className="mb-2" />
              <span className="text-xs font-semibold uppercase tracking-wider">Upload</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          )}
        </div>

        {isEditing ? (
          <div className="w-full space-y-4">
             <div>
               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Username</label>
               <input 
                 type="text" 
                 value={editFormData.name} 
                 onChange={(e) => setEditFormData({ name: e.target.value })}
                 className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all font-medium"
               />
             </div>
             
             <div className="flex items-center gap-3 pt-4">
               <button 
                 onClick={handleSaveProfile} 
                 disabled={isSaving}
                 className="flex-1 bg-gray-900 text-white font-semibold py-2.5 rounded-full hover:bg-black transition-colors disabled:opacity-50"
               >
                 {isSaving ? "Saving..." : "Save"}
               </button>
               <button 
                 onClick={() => {
                   setIsEditing(false);
                   setPreviewURL(null);
                   setSelectedFile(null);
                   setEditFormData({ name: user.name });
                 }} 
                 disabled={isSaving}
                 className="flex-1 bg-white text-gray-700 font-semibold py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
               >
                 Cancel
               </button>
             </div>
          </div>
        ) : (
          <div className="w-full text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 font-medium mt-1 mb-6">{user.email}</p>
            
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full flex items-center justify-center md:justify-start gap-2 text-gray-600 font-semibold hover:text-black transition-colors"
            >
              <FiEdit2 size={18} />
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Right Content: My Posts */}
      <div className="w-full md:w-2/3 lg:w-3/4">
        <div className="border-b border-gray-200 mb-8 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">My Stories</h2>
        </div>

        {loadingBlogs ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : myBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {myBlogs.map(blog => (
              <Card key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
           <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
             <h3 className="text-xl font-bold text-gray-900 mb-2">No stories yet</h3>
             <p className="text-gray-500 mb-6">You haven't published any stories.</p>
             <a href="/write" className="inline-block px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-black transition-colors">
               Write your first story
             </a>
           </div>
        )}
      </div>

    </div>
  );
};

export default Profile;
