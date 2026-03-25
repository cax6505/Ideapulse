import React, { useState } from 'react';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaRegUser } from "react-icons/fa";
import { signup, login, googleSignIn } from '../../api/auth';
import Modal from '../common/Modal';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [isSignup, setIsSignup] = useState(initialMode === 'signup');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Sync mode when prop changes or modal opens
  React.useEffect(() => {
    setIsSignup(initialMode === 'signup');
    setFormData({ name: '', email: '', password: '' });
    setAgreeTerms(false);
  }, [initialMode, isOpen]);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const storeEmailPrefix = (email) => {
    if (email) {
      const emailPrefix = email.split('@')[0];
      localStorage.setItem('emailPrefix', emailPrefix);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup && !agreeTerms) {
      alert('Please agree to the Terms & Conditions');
      return;
    }

    setLoading(true);
    const { name, email, password } = formData;
    
    try {
      const response = isSignup 
        ? await signup({ name, email, password }) 
        : await login({ email, password });

      if (isSignup) {
        setIsSignup(false);
        setFormData({ ...formData, password: '' });
        alert('Account created! Please login.');
      } else {
        localStorage.setItem('token', response.token); 
        storeEmailPrefix(email); 
        onClose();
        window.location.reload();
      }
    } catch (error) {
      alert(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const response = await googleSignIn();
      localStorage.setItem('token', response.token);
      storeEmailPrefix(response.email); 
      onClose();
      window.location.reload(); 
    } catch (error) {
      alert(error.message || 'Google Sign-In failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 md:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-gray-500 font-medium">
            {isSignup ? 'start for free' : 'login to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignup && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <FaRegUser size={18} />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all font-medium text-gray-700"
                required={isSignup}
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <MdOutlineEmail size={20} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all font-medium text-gray-700"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <MdLockOutline size={20} />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all font-medium text-gray-700"
              required
            />
          </div>

          {isSignup && (
            <div className="flex items-center mt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-gray-900 rounded border-gray-300 focus:ring-gray-900"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree with the <span className="font-bold text-gray-900">Terms & Condition</span>
              </label>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Processing' : (isSignup ? 'Continue →' : 'Login →')}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="mx-4 text-gray-400 text-sm font-medium">or</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors"
          >
            {isSignup ? (
              <>Already have an account? <span className="font-bold text-gray-900">Login</span></>
            ) : (
              <>Don't have an account? <span className="font-bold text-gray-900">Sign Up</span></>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
