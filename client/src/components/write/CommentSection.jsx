import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../../api/firebase";
import { FiSend, FiMessageSquare, FiUser } from 'react-icons/fi';
import { formatRelativeTime } from "../../utils/timeUtils";

/**
 * Real-time Comment Section using Firestore.
 * @param {string} blogId - ID of the blog post.
 */
const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const emailPrefix = localStorage.getItem("emailPrefix");
    const photoURL = localStorage.getItem("photoURL");
    const token = localStorage.getItem("token");

    if (token && (userName || emailPrefix)) {
      setUser({
        name: userName || emailPrefix,
        photoURL: photoURL,
      });
    }
  }, []);

  // Listen for real-time updates to comments
  useEffect(() => {
    if (!blogId) return;

    const q = query(
      collection(db, "blogs", blogId, "comments"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      }));
      setComments(commentsList);
    });

    return () => unsubscribe();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "blogs", blogId, "comments"), {
        text: newComment.trim(),
        author: user.name,
        authorPic: user.photoURL || "",
        createdAt: serverTimestamp(),
      });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment: ", error);
      alert("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-5">
        <FiMessageSquare className="text-2xl text-gray-400" />
        <h3 className="text-2xl font-bold text-gray-900 font-serif">
          Comments <span className="text-gray-300 ml-1">({comments.length})</span>
        </h3>
      </div>

      {/* Input Section */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
               <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white overflow-hidden border border-gray-100 shadow-sm">
                 {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                 ) : (
                    <FiUser className="text-xl opacity-70" />
                 )}
               </div>
            </div>
            
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts on this story..."
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-200 outline-none transition-all resize-none min-h-[120px]"
                rows="3"
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm
                    ${!newComment.trim() || isSubmitting 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-900 text-white hover:bg-black hover:shadow-md'}`}
                >
                  <FiSend />
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-8 mb-12 text-center border border-dashed border-gray-200">
           <p className="text-gray-500 text-sm font-medium">Please sign in to join the conversation.</p>
        </div>
      )}

      {/* List Section */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
             <div className="flex-shrink-0 pt-1">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden border border-white shadow-sm ring-1 ring-black/5">
                  {comment.authorPic ? (
                     <img src={comment.authorPic} alt={comment.author} className="w-full h-full object-cover" />
                  ) : (
                     <FiUser className="text-xl" />
                  )}
                </div>
             </div>
             
             <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-0.5 mb-1.5">
                   <span className="text-sm font-bold text-gray-900">{comment.author}</span>
                   <span className="text-[10px] text-gray-400 font-medium">{formatRelativeTime(comment.createdAt)}</span>
                </div>
                <div className="text-gray-800 text-[15px] leading-relaxed whitespace-pre-wrap">
                   {comment.text}
                </div>
             </div>
          </div>
        ))}
        
        {comments.length === 0 && (
          <div className="text-center py-10">
             <p className="text-gray-400 text-sm font-medium">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
