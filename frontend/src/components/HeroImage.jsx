import React from 'react';

export const HeroImage = () => {
  return (
    <section className="w-[849px] h-[1024px] relative overflow-hidden max-md:w-full max-md:h-[400px] max-sm:h-[300px]">
      <img
        src="/port.png"
        alt="Login hero image"
        className="w-full h-full object-cover"
      />
    </section>
  );
};