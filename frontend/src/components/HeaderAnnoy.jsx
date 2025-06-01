import React, { useState, useRef, useEffect } from 'react';
import { logoutUser } from '../api/auth.api';
import { Link,useNavigate } from 'react-router-dom';
export const HeaderAnnoy = ({ user,setUser }) => {
  const isLoggedIn = user?.loggedIn;
  const userInfo = user?.user;
  const isHR = userInfo?.role === 'HR';

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async() => {
    try {
      // Add logout logic here (e.g., API call and redirect)
      await logoutUser();
      setDropdownOpen(false); // close dropdown
      setUser(null);   
      navigate('/login'); // 
    } catch (error) {
      console.error('Logout failed:', error);
    }
    
  };

  return (
    <header className="bg-white self-stretch flex w-full items-stretch flex-wrap pl-3.5 pr-4 pt-[5px] pb-3 max-md:max-w-full">
      {/* Logo */}
      <div className="flex items-stretch gap-[5px] text-[32px] text-[rgba(54,122,255,1)] font-extrabold whitespace-nowrap">
        <img
          src="/logo.png"
          className="aspect-[1] object-contain w-[69px] shrink-0"
          alt="ResurgeFolio Logo"
        />
        <div className="basis-auto my-auto">ResurgeFolio</div>
      </div>

      {/* Navigation */}
      <nav className="flex items-stretch gap-[27px] text-[#242424] font-medium my-auto ml-auto">
        <div className="flex gap-[30px] text-[15px] whitespace-nowrap text-center leading-none my-auto">
          <a href="/" className="text-[#242424] hover:text-[rgba(54,122,255,1)] transition-colors">Home</a>
          <a href="/#how-it-works" className="text-[#242424] hover:text-[rgba(54,122,255,1)] transition-colors">About</a>

          {isHR ? (
            <>
              <a href="/review" className="hover:text-[rgba(54,122,255,1)] transition-colors">Review Portfolio</a>
              <a href="/browse" className="hover:text-[rgba(54,122,255,1)] transition-colors">Browse Resume</a>
            </>
          ) : isLoggedIn ? (
            <>
            <a href="/submit" className="hover:text-[rgba(54,122,255,1)] transition-colors">Submit Portfolio</a>
            <a href="/browse" className="hover:text-[rgba(54,122,255,1)] transition-colors">Browse Resume</a>
            </>
          ) : null}
        </div>

        {/* Right-side: Bell + Dropdown */}
        <div className="relative flex items-center gap-4 ml-6" ref={dropdownRef}>
          {isLoggedIn && (
            <Link to='/notification'>
            <span className="text-xl cursor-pointer" title="Notifications">🔔</span>
            </Link>
            
          )}

          {isLoggedIn ? (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center px-3 py-2 border border-[#242424] rounded-md hover:bg-gray-100 transition-colors text-sm"
            >
              {userInfo?.name} <span className="ml-2">▼</span>
            </button>
          ) : (
            <a
              href="/login"
              className="justify-center items-center bg-[#B69CF8] flex gap-1.5 p-2.5 rounded-md hover:bg-[#A085F7] transition-colors text-sm"
            >
              <span className="text-[#242424] self-stretch my-auto">Sign in</span>
            </a>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-gray-300 rounded-md shadow-md w-48 z-50">
              <a
                href="/useredit"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Edit Profile
              </a>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};