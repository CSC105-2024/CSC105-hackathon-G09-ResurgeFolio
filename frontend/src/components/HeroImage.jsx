import React from 'react';

export const HeroImage = () => {
  return (
    <section className="w-[849px] h-[1024px] relative overflow-hidden max-md:w-full max-md:h-[400px] max-sm:h-[300px]">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a28a9e3db9f3f3361f03cd1d6bc8bddadc0089b?placeholderIfAbsent=true"
        alt="Login hero image"
        className="w-full h-full object-cover"
      />
    </section>
  );
};