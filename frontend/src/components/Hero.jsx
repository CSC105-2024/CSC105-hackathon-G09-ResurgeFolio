import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Hero = ({ user }) => {
  const targetPath = user?.loggedIn ? "/browse" : "/register";
  return (
    <section className="bg-[rgba(54,122,255,1)] self-stretch flex w-full flex-col items-center text-2xl text-white font-black justify-center px-20 py-[97px] max-md:max-w-full max-md:pb-[100px] max-md:px-5">
      <div className="flex mb-[-23px] w-full max-w-[1019px] flex-col items-center max-md:max-w-full max-md:mb-2.5">
        <h1 className="text-[64px] max-md:max-w-full max-md:text-[40px]">
          Turn Failure to Fuel
        </h1>
        <p className="font-normal text-center self-stretch mt-7 max-md:max-w-full">
          Learn from others' application experiences. Every rejection is a step closer to acceptance.
        </p>


        <Link
          to={targetPath}
          className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[386px] max-w-full text-center mt-[42px] px-[70px] py-[25px] rounded-[50px] max-md:mt-10 max-md:px-5 hover:bg-[rgba(44,102,235,1)] transition-colors block"
        >
          Start with us
        </Link>
      </div>
    </section>
  );
};
