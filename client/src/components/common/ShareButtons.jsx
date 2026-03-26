import React, { useState } from 'react';
import { 
  FiTwitter, 
  FiLinkedin, 
  FiLink, 
  FiCheck 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

/**
 * Social Sharing Component.
 * @param {string} title - Article title.
 * @param {string} url - Current page URL.
 */
const ShareButtons = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  
  const encodedUrl = encodeURIComponent(url || window.location.href);
  const encodedTitle = encodeURIComponent(title || '');

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-green-50 hover:text-green-600',
    },
    {
      name: 'Twitter',
      icon: <FiTwitter />,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:bg-blue-50 hover:text-blue-400',
    },
    {
      name: 'LinkedIn',
      icon: <FiLinkedin />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-indigo-50 hover:text-indigo-700',
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">Share</span>
      <div className="flex items-center gap-2">
        {shareLinks.map((share) => (
          <a
            key={share.name}
            href={share.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${share.name}`}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-gray-500 transition-all duration-300 border border-gray-100 bg-white shadow-sm hover:shadow-md ${share.color}`}
          >
            {share.icon}
          </a>
        ))}
        
        <button
          onClick={handleCopyLink}
          title="Copy Link"
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-100 bg-white shadow-sm hover:shadow-md
            ${copied ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
        >
          {copied ? <FiCheck /> : <FiLink />}
        </button>
      </div>
      
      {copied && (
        <span className="text-[10px] font-bold text-indigo-600 animate-fade-in">Link Copied!</span>
      )}
    </div>
  );
};

export default ShareButtons;
