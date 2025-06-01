import React, { useEffect } from 'react'; // useEffect is not used in this component, can be removed if not planned for future use.
import { Link } from 'react-router-dom';

export const Hero = ({ user }) => {
  const targetPath = user?.loggedIn ? "/browse" : "/register";

  return (
    <section
      className="self-stretch flex w-full flex-col items-center justify-center 
                 text-white px-6 py-20 md:px-20 md:py-28
                 bg-gradient-to-br from-[rgba(54,122,255,1)] to-[rgba(30,90,220,1)]" // Enhanced background and adjusted padding
    >
      <div className="w-full max-w-screen-lg flex flex-col items-center text-center"> {/* Centered content container */}
        <h1
          className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-[80px] leading-tight" // Enhanced typography
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }} // Subtle text shadow for depth
        >
          Turn Failure to Fuel
        </h1>
        <p
          className="mt-6 text-lg font-light max-w-xl md:text-xl lg:text-2xl leading-relaxed opacity-90" // Softer paragraph style
        >
          Learn from others' application experiences. Every rejection is a step closer to acceptance.
        </p>

        <Link
          to={targetPath}
          className="inline-flex items-center justify-center mt-10 px-8 py-4 md:px-10 md:py-4 
                     text-lg md:text-xl font-semibold
                     bg-white text-[rgba(54,122,255,1)]  // Switched to white button with blue text
                     rounded-full shadow-xl hover:bg-gray-100 
                     transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl" // Enhanced button style & hover
        >
          Start with us
          {/* Adding an arrow icon for better visual cue */}
          <svg 
            className="ml-3 h-5 w-5 md:h-6 md:w-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </Link>
      </div>
    </section>
  );
};