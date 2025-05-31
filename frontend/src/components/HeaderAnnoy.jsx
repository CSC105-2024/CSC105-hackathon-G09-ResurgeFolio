import React from 'react';

export const HeaderAnnoy = () => {
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
      <nav className="flex items-stretch gap-[27px] text-[#242424] font-medium my-auto ml-auto">
        <div className="flex gap-[30px] text-[15px] whitespace-nowrap text-center leading-none my-auto">
          <a href="/" className="text-[#242424] hover:text-[rgba(54,122,255,1)] transition-colors">
            Home
          </a>
          <a href="/#how-it-works" className="text-[#242424] hover:text-[rgba(54,122,255,1)] transition-colors">
            About
          </a>
        </div>
        <div className="bg-white flex flex-col text-sm leading-none">

          <a
            href="/login"
            className="justify-center items-center bg-[#B69CF8] flex gap-1.5 p-2.5 rounded-md hover:bg-[#A085F7] transition-colors text-decoration-none" // Added text-decoration-none to remove underline if not desired
          >
            <span className="text-[#242424] self-stretch my-auto">
              Sign in
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};