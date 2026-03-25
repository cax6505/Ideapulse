import { Link } from 'react-router-dom';

const Footer = ({ isLanding = false }) => {
  const bgClass = isLanding ? 'bg-[#f7f4ea]' : 'bg-white';
  const borderClass = isLanding ? 'border-t border-black' : 'border-t border-gray-200';

  return (
    <footer className={`w-full ${bgClass} ${borderClass}`}>
      <div className={`max-w-7xl mx-auto w-full flex items-center justify-between px-6 md:px-12 lg:px-16 py-5`}>
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 text-black hover:opacity-80 transition-opacity">
          <span className="font-serif text-2xl tracking-tight hidden sm:block">BlogVerse</span>
        </Link>

        {/* Right: Copyright */}
        <p className="text-sm text-gray-500 font-sans">
          © BlogVerse {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;