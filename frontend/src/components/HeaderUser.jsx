import React, { useState } from 'react';

export const HeaderUser = ({ onLogout }) => { // Accept onLogout prop
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogoutClick = (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    if (onLogout) {
      onLogout(); // Call the function passed from Homepage
    }
    setIsProfileOpen(false); // Close the dropdown
  };

  return (
    <header className="bg-white self-stretch flex w-full items-stretch flex-wrap pl-3.5 pr-4 pt-[5px] pb-3 max-md:max-w-full">
      <div className="flex items-stretch gap-[5px] text-[32px] text-[rgba(54,122,255,1)] font-extrabold whitespace-nowrap">
        <img
          src="/logo.png"
          className="aspect-[1] object-contain w-[69px] shrink-0"
          alt="ResurgeFolio Logo"
        />
        <div className="basis-auto my-auto">
          ResurgeFolio
        </div>
      </div>

      <nav className="flex items-center gap-[27px] my-auto ml-auto">
        <div className="flex gap-[30px] text-[15px] text-[#242424] font-medium whitespace-nowrap text-center leading-none">
          <a href="/" className="text-[#242424] hover:text-[rgba(54,122,255,1)] transition-colors">
            Home
          </a>
          <a href="about" className="text-[#242424] hover:text-[rgba(54,122,255,1)] transition-colors">
            About
          </a>
          <a href="submit" className="text-[#242424] hover:text-[rgba(54,122,255,1)] transition-colors">
            Submit Portfolio
          </a>
          <a href="#browse" className="text-[#242424] hover:text-[rgba(54,122,255,1)] transition-colors">
            Browse Resume
          </a>
        </div>

        <div className="flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/aa26fee6347016f12ead58db57ed24d5ccd513de?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-6 shrink-0"
            alt="Notification"
          />
          <div className="relative">
            <button
              className="justify-center items-center border bg-[#9747FF] flex min-h-11 gap-1.5 p-2.5 rounded-md border-solid border-black hover:bg-[#8a3ef0] transition-colors"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <span className="text-[#242424] text-sm font-semibold leading-none self-stretch my-auto">
                John Smith
              </span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/60dd5328f36acca51a75f737987db2b2f1eced6a?placeholderIfAbsent=true"
                className={`aspect-[1] object-contain w-6 self-stretch my-auto transition-transform duration-200 ease-in-out ${isProfileOpen ? 'rotate-180' : ''}`}
                alt="Dropdown arrow"
              />
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <a href="#profile" className="block px-4 py-2 text-sm text-[#242424] hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="#settings" className="block px-4 py-2 text-sm text-[#242424] hover:bg-gray-100">
                    Settings
                  </a>
                  {/* Updated Logout link to call handleLogoutClick */}
                  <a 
                    href="#logout" 
                    onClick={handleLogoutClick} 
                    className="block px-4 py-2 text-sm text-[#242424] hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};