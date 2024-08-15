import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/" className="hover:underline">
            News Aggregator
          </Link>
        </div>
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }></path>
            </svg>
          </button>
        </div>
        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } sm:flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0`}>
          <Link to="/" className="block hover:underline">
            Home
          </Link>
          <Link to="/preferences" className="block hover:underline">
            Preferences
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
