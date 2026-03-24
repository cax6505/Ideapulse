import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, login, googleSignIn } from '../../api/auth'; 
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

function Auth() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isSignup, setIsSignup] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      password: ''
    });
    setAgreeTerms(false);
  };

  const storeEmailPrefix = (email) => {
    if (email.includes('@gmail.com')) {
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

    const { name, email, password } = formData;
    
    try {
      const response = isSignup ? await signup({ name, email, password }) : await login({ email, password });
      clearForm();

      if (isSignup) {
        setIsSignup(false);
        navigate('/auth');
      } else {
        localStorage.setItem('token', response.token); 
        storeEmailPrefix(email); 
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      alert(error.message || 'Something went wrong');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await googleSignIn();
      localStorage.setItem('token', response.token);
      storeEmailPrefix(response.email); 
      navigate('/');
      window.location.reload(); 
    } catch (error) {
      alert(error.message || 'Google Sign-In failed');
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    clearForm();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 md:p-10 bg-white">
        
        {/* Header section matching reference structure */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-gray-500 font-medium">
            {isSignup ? 'start for free' : 'login to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {isSignup && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaRegUser className="text-gray-400 text-lg" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder-gray-400 font-medium text-gray-700"
                required={isSignup}
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MdOutlineEmail className="text-gray-400 text-xl" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder-gray-400 font-medium text-gray-700"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MdLockOutline className="text-gray-400 text-xl" />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder-gray-400 font-medium text-gray-700"
              required
            />
          </div>

          {isSignup && (
            <div className="flex items-center mt-2 mb-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600 font-medium">
                I agree with the <span className="text-gray-900 font-bold hover:underline cursor-pointer">Terms & Condition</span>
              </label>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full py-3.5 mt-2 bg-gray-900 text-white font-bold rounded-xl shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
          >
            {isSignup ? 'Continue →' : 'Login →'}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors focus:outline-none"
          >
            {isSignup ? (
              <>Already have an account? <span className="font-bold text-gray-900">Login</span></>
            ) : (
              <>Don&apos;t have an account? <span className="font-bold text-gray-900">Sign Up</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
